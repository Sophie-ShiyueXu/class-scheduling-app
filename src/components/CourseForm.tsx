import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseFormSchema, type CourseFormData } from '../schemas/courseValidation';
import type { Course } from '../App';
import { updateCourse } from '../utilities/firebase';
import { useState } from 'react';

type Props = {
  course: Course;
  courseId: string;
  onCancel: () => void;
  onSave?: () => void;
};

function CourseForm({ course, courseId, onCancel, onSave }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: course.title,
      term: course.term as 'Fall' | 'Winter' | 'Spring' | 'Summer',
      number: course.number,
      meets: course.meets
    },
    mode: 'onChange'
  });

  // Watch all form values to detect changes
  const watchedValues = watch();

  const onSubmit = async (data: CourseFormData) => {
    // Check if there are any form errors
    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      return;
    }

    // Check if there are any changes
    if (!isDirty) {
      alert('No changes to save.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Update course in Firebase
      await updateCourse(courseId, data);
      
      // Show success message
      alert('Course updated successfully!');
      
      // Call onSave callback if provided
      if (onSave) {
        onSave();
      }
    } catch (error) {
      console.error('Error updating course:', error);
      setSubmitError('Failed to update course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasErrors = Object.keys(errors).length > 0;
  const canSubmit = !hasErrors && isDirty && !isSubmitting;

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Edit Course</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="term" className="form-label">
                    Term
                  </label>
                  <select
                    className={`form-select ${errors.term ? 'is-invalid' : ''}`}
                    id="term"
                    {...register('term')}
                  >
                    <option value="Fall">Fall</option>
                    <option value="Winter">Winter</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                  </select>
                  {errors.term && (
                    <div className="invalid-feedback">
                      {errors.term.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="number" className="form-label">
                    Course Number
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.number ? 'is-invalid' : ''}`}
                    id="number"
                    placeholder="e.g., 213-2"
                    {...register('number')}
                  />
                  <div className="form-text">
                    Enter course number with optional section (e.g., "394" or "213-2")
                  </div>
                  {errors.number && (
                    <div className="invalid-feedback">
                      {errors.number.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Course Title
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    id="title"
                    placeholder="e.g., Artificial Intelligence"
                    {...register('title')}
                  />
                  <div className="form-text">
                    Course title must be at least 2 characters long
                  </div>
                  {errors.title && (
                    <div className="invalid-feedback">
                      {errors.title.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="meets" className="form-label">
                    Meeting Times
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.meets ? 'is-invalid' : ''}`}
                    id="meets"
                    placeholder="e.g., MWF 12:00-13:20 (or leave empty)"
                    {...register('meets')}
                  />
                  <div className="form-text">
                    Enter days and time range, e.g., "MWF 12:00-13:20" or leave empty for TBA
                  </div>
                  {errors.meets && (
                    <div className="invalid-feedback">
                      {errors.meets.message}
                    </div>
                  )}
                </div>


                {submitError && (
                  <div className="alert alert-danger mb-3">
                    {submitError}
                  </div>
                )}

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`btn ${canSubmit ? 'btn-primary' : 'btn-outline-primary'}`}
                    disabled={!canSubmit}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Saving...
                      </>
                    ) : hasErrors ? (
                      'Fix Errors to Submit'
                    ) : !isDirty ? (
                      'No Changes'
                    ) : (
                      'Submit'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseForm;