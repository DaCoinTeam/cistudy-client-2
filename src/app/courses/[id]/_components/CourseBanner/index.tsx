import { faBriefcase, faChartSimple, faClock, faRotate } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Avatar, Chip, Spacer } from "@nextui-org/react"
import Rating from "../Rating"

export const CourseBanner = () => {
    // const { swrs } = useContext(CourseDetailsContext)!
    // const { courseSwr } = swrs
    // const { data: course } = courseSwr
    const course={
        title:"React Native: Advanced Concepts",
        description:"Master the advanced topics of React Native: Animations, Maps, Notifications, Navigation and More!",
        rating:4.5,
        creator:"Stephen Grider",
        creatorImg:"https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg",
        previewImg:"https://edgecoursebd.com/wp-content/uploads/2022/04/274886969_1014478982810346_4519317107199743625_n.jpg",
        level:"Intermediate",
        students:423554,
        time: "2h 30m"

    }
    
    return (
        <div className='w-full h-auto object-cover bg-slate-200 dark:bg-slate-800 px-[5em] py-[2em] justify-start flex 	'>
            <div className='max-w-[1920px] justify-start flex'>
                <div className="w-2/3">

                    <div className='text-2xl font-bold text-gray-900 dark:text-white md:text-4xl '>
                        <span className='text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400'>
                            {course?.title.split(" ").slice(0, -2).join(" ")}
                        </span>{" "}
                        <span className='text-gray-900 dark:text-white'>
                            {course?.title.split(" ").slice(-2).join(" ")}.
                        </span>{" "}
                    </div>

                    <Spacer y={4} />

                    <div className='text-lg font-normal text-dark lg:text-xl dark:text-white'>
                        {course?.description}
                    </div>

                    <Spacer y={3} />
                    <div className='flex items-center '>
                        <Avatar src={course.creatorImg} name="Junior" size='sm' />
                        <div>
                            <p className='ms-2 text-sm font-medium text-dark dark:text-white'>
            Created by{" "}
                                <a href='#' className='text-dark dark:text-white font-bold hover:underline'>
                                    {course.creator}
                                </a>
                            </p>
                        </div>
                        
                    </div>
                    <Spacer y={3} />

                    <Rating stars={4.5} />


                    
                    <Spacer y={4} />    
                    <div>
                        <Chip  startContent={ <FontAwesomeIcon icon={faChartSimple}  className="secondary w-4 h-4  p-1  " />} className="me-2"  color="secondary" variant="bordered">{course.level}</Chip>
                        <Chip  startContent={ <FontAwesomeIcon icon={faClock}  className="secondary w-4 h-4  p-1" />} className="me-2" color="secondary"  variant="bordered">{course.time}</Chip>
                        <Chip  startContent={ <FontAwesomeIcon icon={faBriefcase}  className="secondary w-4 h-4  p-1  " />} className="me-2" color="secondary" variant="bordered">Real Projects</Chip>
                        <Chip  startContent={ <FontAwesomeIcon icon={faRotate}  className="secondary w-4 h-4  p-1  " />} className="me-2" color="secondary" variant="bordered">Last Update March 8th, 2024</Chip>

                    </div>
                    <Spacer y={4} />    
                    {/* <Button radius="sm" className="me-2 px-8 py-6 text-md" endContent={ <FontAwesomeIcon icon={faArrowRight}  className="text-primary w-4 h-4  " />} >
        Buy Now
      </Button> 
      <Button radius="sm" color="primary" variant="bordered" className="me-2 px-8 py-6 text-md" >
        Add To Cart
      </Button>  */}


                    {/* <div className='py-2 flex'>
                        <p className='text-sm font-extrabold text-gray-900 dark:text-gray-400 '>
            423,554 
                        </p>
                        <p className='text-sm font-normal text-gray-500 dark:text-gray-400 ps-1'>
          already enroll
                        </p>
                    </div> */}
                    {/* <Button radius="sm">
        Small
      </Button>   */}
                </div>
                
            </div>
        </div>
    )
}
