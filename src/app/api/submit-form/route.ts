import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

console.log("hello");
console.log('API Route loaded - Environment check:');
console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Not set');

export async function POST(request: Request) {
  console.log('=== Form Submission API Call Started ===');
  
  if (!request.body) {
    console.log('❌ No request body found');
    return NextResponse.json(
      { error: 'Request body is required' },
      { status: 400 }
    );
  }

  try {
    const formData = await request.json();
    console.log('📝 Form data received:', JSON.stringify(formData, null, 2));

    // Validate required fields
    const requiredFields = ['companyName', 'contactName', 'email', 'projectType', 'budget', 'timeline', 'description'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      console.log('❌ Missing required fields:', missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    console.log('🔧 Preparing data for Supabase insertion...');
    const submissionData = {
      company_name: formData.companyName,
      contact_name: formData.contactName,
      email: formData.email,
      phone: formData.phone || null,
      website: formData.website || null,
      project_type: formData.projectType,
      budget: formData.budget,
      timeline: formData.timeline,
      description: formData.description,
      additional_info: formData.additionalInfo || null,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    console.log('📤 Attempting to insert data into Supabase:', JSON.stringify(submissionData, null, 2));

    const { data, error } = await supabaseAdmin
      .from('client_submissions')
      .insert([submissionData])
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase error:', error);
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      return NextResponse.json(
        { error: 'Failed to submit form', details: error.message },
        { status: 500 }
      );
    }

    console.log('✅ Form submitted successfully:', data);
    return NextResponse.json(
      { message: 'Form submitted successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Form submission error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  } finally {
    console.log('=== Form Submission API Call Ended ===');
  }
} 