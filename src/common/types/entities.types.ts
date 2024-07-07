import { Address, LogsOutput } from "web3"

export enum AccountKind {
  Local = "local",
  Google = "google",
  Facebook = "facebook",
}

export enum AccountRole {
  Account = "account",
  Moderator = "moderator",
  Administrator = "administrator",
}

export enum VerifyStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

export enum ProcessStatus {
  Pending = "pending",
  Processing = "processing",
  Completed = "completed",
}

export enum MediaType {
  Image = "image",
  Video = "video",
}

export enum VideoType {
  MP4 = "mp4",
  DASH = "dash",
}
export interface RoleEntity {
  roleId: string
  name: string
  accountId: string
  accountRoles: AccountEntity
  createdAt: Date
  isDisabled: boolean
  updatedAt: Date
}
export interface AccountEntity {
  accountId: string;
  email: string;
  password?: string;
  avatarId?: string;
  avatarUrl?: string;
  phoneNumber?: string;
  balance: number;
  roles: Array<RoleEntity>;
  walletAddress?: string;
  firstName?: string;
  lastName?: string;
  birthdate?: Date;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  verified: boolean;
  kind: AccountKind;
  externalId?: string;
  coverPhotoId: string;
  sessions: Array<SessionEntity>;
  postComments: Array<PostCommentEntity>;
  postReacts: Array<PostReactEntity>;
  enrolledInfos: Array<EnrolledInfoEntity>;
  posts: Array<PostEntity>;
  courses: Array<CourseEntity>;
  //graphql
  followed?: boolean;
  numberOfFollowers?: number;
}

export interface PostEntity {
  postId: string;
  title: string;
  creatorId: string;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
  course: CourseEntity;
  creator: AccountEntity;
  html: string;
  postMedias: Array<PostMediaEntity>;
  postComments: Array<PostCommentEntity>;
  postReacts: Array<PostReactEntity>;
  //graphql
  numberOfLikes?: number;
  numberOfComments?: number;
  liked?: number;
  isRewardable: boolean;
  isCompleted: boolean;
  isPostOwner: boolean;

}

export interface CourseEntity {
  courseId: string;
  title: string;
  thumbnailId: string;
  description: string;
  creatorId: string;
  price: number;
  discountPrice: number;
  enableDiscount: boolean;
  verifyStatus: VerifyStatus;
  isDraft: boolean;
  creator: AccountEntity;
  isDeleted: boolean;
  previewVideoId: string;
  includes: string;
  createdAt: Date;
  updatedAt: Date;
  courseTopics: Array<CourseTopicEntity>;
  categoryId: string;
  category: CategoryEntity;
  courseSubcategories: Array<CourseSubcategoryEntity>;
  courseTargets: Array<CourseTargetEntity>;
  posts: Array<PostEntity>;
  enrolledInfos: Array<EnrolledInfoEntity>;
  sections: Array<SectionEntity>;
  receivedWalletAddress?: string;

  //graphql
  numberOfEnrollments?: number;
  enrolled?: boolean;
}
export interface CourseTargetEntity {
  courseTargetId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  position: number;
  courseId: string;
  course: CourseEntity;
}

export interface EnrolledInfoEntity {
  enrolledId: string;
  accountId: string;
  courseId: string;
  enrolledAt: Date;
  course: CourseEntity;
  account: AccountEntity;
  enrolled: boolean;
}

export interface LessonEntity {
  lessonId: string;
  title: string;
  thumbnailId?: string;
  lessonVideoId?: string;
  sectionId: string;
  processStatus: ProcessStatus;
  videoType: VideoType;
  createdAt: Date;
  updatedAt: Date;
  section: SectionEntity;
  resources: Array<ResourceEntity>;
  numberOfViews: number;
  description: string;
}

export interface PostCommentLikeEntity {
  postCommentLikeId: string;
  accountId: string;
  postId: string;
  createdAt: Date;
  account: AccountEntity;
  postComment: PostCommentEntity;
}

export interface PostCommentEntity {
  postCommentId: string;
  creatorId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  post: PostEntity;
  creator: AccountEntity;
  html: string;
  postCommentMedias: Array<PostCommentMediaEntity>;
  postCommentLikes: Array<PostCommentLikeEntity>;
  //graphql
  numberOfLikes?: number;
  numberOfReplies?: number;
  liked?: number;
  isRewardable: boolean;
  isCommentOwner: boolean;
  isSolution: boolean;
}

export interface PostCommentReplyEntity {
  postCommentReplyId: string;
  creatorId: string;
  postCommentId: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  postComment: PostCommentEntity;
  creator: AccountEntity;
}

export interface SectionEntity {
  sectionId: string;
  title: string;
  courseId: string;
  createdAt: Date;
  course: CourseEntity;
  lessons: Array<LessonEntity>;
}

export interface ResourceEntity {
  resourceId: string;
  name: string;
  fileId: string;
  lessonId: string;
  createdAt: Date;
  updatedAt: Date;
  lesson: LessonEntity;
}

export interface SessionEntity {
  sessionId: string;
  accountId: string;
  createdAt: Date;
  isDisabled: boolean;
  clientId: string;
  account: AccountEntity;
}

export interface PostReactEntity {
  postReactId: string;
  accountId: string;
  postId: string;
  liked: boolean;
  createdAt: Date;
  updatedAt: Date;
  account: AccountEntity;
  post: PostEntity;
}

export interface PostMediaEntity {
  postMediaId: string;
  position: number;
  mediaId: string;
  postId: string;
  mediaType: MediaType;
  post: PostEntity;
}

export interface PostCommentMediaEntity {
  postCommentMediaId: string;
  position: number;
  mediaId: string;
  postCommentId: string;
  mediaType: MediaType;
  postComment: PostCommentEntity;
}

export interface CategoryEntity {
  categoryId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  subcategories: Array<SubcategoryEntity>;
}

export interface SubcategoryEntity {
  subcategoryId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  categoryId: string;
  category: CategoryEntity;
  subcategoryTopics: Array<SubcategoryTopicEntity>;
}

export interface SubcategoryTopicEntity {
  subcategoryTopicId: string;
  createdAt: Date;
  updatedAt: Date;
  subcategoryId: string;
  topicId: string;
  subcategory: SubcategoryEntity;
  topic: TopicEntity;
}

export interface TopicEntity {
  topicId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  svgId: string;
  courseTopics: Array<CourseTopicEntity>;
  subcategoryTopics: Array<SubcategoryTopicEntity>;
}

export interface CourseTopicEntity {
  courseTopicId: string;
  createdAt: Date;
  updatedAt: Date;
  courseId: string;
  topicId: string;
  course: CourseEntity;
  topic: TopicEntity;
}

export interface CourseSubcategoryEntity {
  courseSubcategoryId: string;
  createdAt: Date;
  updatedAt: Date;
  courseId: string;
  subcategoryId: string;
  course: CourseEntity;
  subcategory: SubcategoryEntity;
}

export interface CourseTopicEntity {
  courseTopicId: string;
  createdAt: Date;
  updatedAt: Date;
  courseId: string;
  topicId: string;
  course: CourseEntity;
  topic: TopicEntity;
}

export interface TransactionEntity {
  transactionHash: string;
  from: Address;
  to: Address;
  value: string;
  isValidated: boolean;
  createdAt: Date;
  updatedAt: Date;
  log: LogsOutput;
}

export interface CartEntity {
  cartId: string
  cartCourses: Array<CartCourseEntity>
  isDeleted: boolean
  createdAt: Date
  updatedAt: Date
  account: AccountEntity
}
export interface CartCourseEntity {
  cartCourseId: string
  cartId: string
  courseId: string
  createdAt: Date
  updatedAt: Date
  course: CourseEntity
  cart: CartEntity
}
export interface CourseReviewEntity {
  courseReviewId: string
  content: string
  courseId: string
  course?: CourseEntity
  createdAt: Date
  updatedAt: Date
  rating: number
  accountId: string
  account: AccountEntity
  
}