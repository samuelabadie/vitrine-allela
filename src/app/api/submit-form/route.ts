import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  if (!request.body) {
    return NextResponse.json(
      { error: 'Request body is required' },
      { status: 400 }
    );
  }

  try {
    const formData = await request.json();

    // Validate required fields
    const requiredFields = ['companyName', 'contactName', 'email', 'projectType', 'budget', 'timeline', 'description'];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('client_submissions')
      .insert([
        {
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
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit form', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Form submitted successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 