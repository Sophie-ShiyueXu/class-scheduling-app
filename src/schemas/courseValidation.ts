import { z } from 'zod';

// Valid terms
const VALID_TERMS = ['Fall', 'Winter', 'Spring', 'Summer'] as const;

// Days regex patterns
const DAYS_PATTERN = /^[A-Za-z]+$/;
const VALID_DAYS = ['M', 'T', 'W', 'Th', 'F', 'S', 'Su'];

// Time pattern (e.g., "12:00-13:20")
const TIME_PATTERN = /^\d{1,2}:\d{2}-\d{1,2}:\d{2}$/;

// Custom validation function for meeting times
const validateMeetingTime = (meetingTime: string): boolean => {
  if (meetingTime.trim() === '') {
    return true; // Empty string is allowed
  }

  const parts = meetingTime.trim().split(/\s+/);
  if (parts.length !== 2) {
    return false;
  }

  const [daysPart, timePart] = parts;

  // Validate days part
  if (!DAYS_PATTERN.test(daysPart)) {
    return false;
  }

  // Parse days (handle "Th" and other multi-char days)
  const parsedDays: string[] = [];
  let i = 0;
  while (i < daysPart.length) {
    if (daysPart.startsWith('Th', i)) {
      parsedDays.push('Th');
      i += 2;
    } else if (daysPart.startsWith('Su', i)) {
      parsedDays.push('Su');
      i += 2;
    } else {
      parsedDays.push(daysPart[i]);
      i += 1;
    }
  }

  // Check if all parsed days are valid
  if (!parsedDays.every(day => VALID_DAYS.includes(day))) {
    return false;
  }

  // Validate time part
  if (!TIME_PATTERN.test(timePart)) {
    return false;
  }

  // Additional validation: check that start time is before end time
  const [startTime, endTime] = timePart.split('-');
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  
  if (startMinutes >= endMinutes) {
    return false;
  }

  return true;
};

// Zod schema for course form validation
export const courseFormSchema = z.object({
  title: z
    .string()
    .min(2, 'Course title must be at least 2 characters')
    .max(100, 'Course title must be less than 100 characters'),
  
  term: z
    .enum(VALID_TERMS, {
      message: 'Term must be Fall, Winter, Spring, or Summer'
    }),
  
  number: z
    .string()
    .regex(
      /^[0-9]+(?:-[0-9]+)?$/,
      'Course number must be digits with optional section, e.g., "213-2"'
    ),
  
  meets: z
    .string()
    .refine(
      (value) => {
        if (value.trim() === '') return true;
        
        const parts = value.trim().split(/\s+/);
        if (parts.length !== 2) return false;
        
        const [daysPart, timePart] = parts;
        
        // Check days format
        if (!DAYS_PATTERN.test(daysPart)) return false;
        
        // Check time format
        if (!TIME_PATTERN.test(timePart)) return false;
        
        return validateMeetingTime(value);
      },
      {
        message: 'Must contain days and start-end time, e.g., "MWF 12:00-13:20". Start time must be before end time.'
      }
    )
});

export type CourseFormData = z.infer<typeof courseFormSchema>;