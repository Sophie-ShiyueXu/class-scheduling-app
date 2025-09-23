import type{Course} from '../App'

const CourseList =(props:{courses:Record<string,Course>})=>{
    const ids = Object.keys(props.courses);
    return(
        <div>
            {ids.map(id => {const course = props.courses[id];
                return (
                    <div style={{ textAlign: 'left' }} key={id}>
                        <div>
                            {course.term} CS {course.number}: {course.title}
                        </div>
                    </div>
                )
            })}
        </div>
    )


}

export default CourseList;