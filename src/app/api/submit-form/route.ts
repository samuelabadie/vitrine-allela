import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function POST(request: Request) {
  console.log('Starting form submission...');
  
  if (!request.body) {
    console.log('No request body found');
    return NextResponse.json(
      { error: 'Request body is required' },
      { status: 400 }
    );
  }

  try {
    const formData = await request.json();
    console.log('Form data received:', formData);

    // Validate required fields
    const requiredFields = ['companyName', 'contactName', 'email', 'projectType', 'budget', 'timeline', 'description'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      console.log('Missing required fields:', missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    console.log('Checking Supabase configuration...');
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Not set');
    console.log('Supabase Anon Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Not set');

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
      requirements: formData.requirements || null,
      additional_info: formData.additionalInfo || null,
      status: 'new',
      created_at: new Date().toISOString(),
    };

    console.log('Attempting to insert data into Supabase:', submissionData);

    const { data, error } = await supabase
      .from('client_submissions')
      .insert([submissionData])
      .select()
      .single();

    if (error) {
      console.error('Supabase error details:', error);
      return NextResponse.json(
        { error: 'Failed to submit form', details: error.message },
        { status: 500 }
      );
    }

    console.log('Form submitted successfully:', data);
    return NextResponse.json(
      { message: 'Form submitted successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Form submission error details:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 