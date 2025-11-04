import { useForm } from 'react-hook-form';
import type { Course } from '../App';

type CourseFormData = {
  title: string;
  meets: string;
};

type Props = {
  course: Course;
  onCancel: () => void;
};

function CourseForm({ course, onCancel }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CourseFormData>({
    defaultValues: {
      title: course.title,
      meets: course.meets
    },
    mode: 'onChange'
  });

  // This function does nothing as specified in requirements
  const onSubmit = (data: CourseFormData) => {
    // Do nothing - as requested in the requirements
    console.log('Form submitted with data:', data);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Edit Course</h4>
              <small className="text-muted">
                {course.term} • {course.number}
              </small>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Course Title
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    id="title"
                    {...register('title', {
                      required: 'Course title is required',
                      minLength: {
                        value: 1,
                        message: 'Course title cannot be empty'
                      }
                    })}
                  />
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
                    placeholder="e.g., MWF 10:00-10:50"
                    {...register('meets', {
                      required: 'Meeting times are required',
                      minLength: {
                        value: 1,
                        message: 'Meeting times cannot be empty'
                      }
                    })}
                  />
                  {errors.meets && (
                    <div className="invalid-feedback">
                      {errors.meets.message}
                    </div>
                  )}
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                  >
                    Cancel
                  </button>
                  {/* No Submit button as requested */}
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