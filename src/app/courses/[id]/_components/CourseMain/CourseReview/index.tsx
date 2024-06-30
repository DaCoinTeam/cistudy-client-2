import { CourseReviewEntity } from '@common';
import { useContext } from 'react';
import {
  CourseReviewsContext,
  CourseReviewsProvider,
} from './CourseReviewProvider';
import { CourseReviewItem } from './CourseReviewItem';
import { CourseDetailsContext } from '../../../_hooks';

const WrappedCourseReview = () => {
  const { swrs } = useContext(CourseReviewsContext)!;
  const { data } = swrs.courseReviewsSwr;
  const { swrs: courseDetailSwrs } = useContext(CourseDetailsContext)!;
  const { courseSwr } = courseDetailSwrs;
  const { data: course } = courseSwr;
  const courseId = course?.courseId ?? '';

  const getReviews = () => {
    if (!data) return [];
    const reviewsReturn: Array<CourseReviewEntity> = [];
    data.forEach((element) => {
      if (!element) return;
      const { results } = element;
      reviewsReturn.push(...results);
    });
    return reviewsReturn;
  };

  const handleNavigateCourseReviewScreen = (courseId: string) => {
    // navigate(AppScreen.CourseReviewScreen, {
    //     courseId,
    // })
  };
  const handleNavigateAllReviewsScreen = (courseId: string) => {
    // navigate(AppScreen.AllReviewsScreen, {
    //     courseId,
    // })
  };
  return (
    <div>

      {/* <div className="mb-2">
                <RatingDisplay rating={5.0} size="large" />
            </div> */}

      <div
        className='mb-2'
        onClick={() => handleNavigateCourseReviewScreen(courseId)}
      >
        <div className='text-blue-500 text-base'>Leave your review</div>
      </div>

      {getReviews()?.map((item) => {
        console.log('item', item);
        return (
          <div key={item.courseReviewId} >
            <CourseReviewItem review={item} />
          </div>
        );
      })}

      <div
        className='mb-2'
        onClick={() => handleNavigateAllReviewsScreen(courseId)}
      >
        <div className='text-blue-500 text-base'>All reviews</div>
      </div>
    </div>
  );
};

export const CourseReview = () => {
  return (
    <CourseReviewsProvider>
      <WrappedCourseReview />
    </CourseReviewsProvider>
  );
};
