export enum UserKind {
  Local = "local",
  Google = "google",
  Facebook = "facebook",
}

export enum UserRole {
  User = "user",
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

export interface UserEntity {
  userId: string;
  email: string;
  password?: string;
  avatarId?: string;
  phoneNumber?: string;
  balance: number;
  role: UserRole;
  walletId?: string;
  firstName?: string;
  lastName?: string;
  birthdate?: Date;
  username: string;
  verified: boolean;
  kind: UserKind;
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
  creator: UserEntity;
  html: string;
  postMedias: Array<PostMediaEntity>;
  postComments: Array<PostCommentEntity>;
  postReacts: Array<PostReactEntity>;
  //graphql
  numberOfLikes?: number;
  numberOfComments?: number;
  liked?: number;
}

export interface CourseEntity {
  courseId: string;
  title: string;
  thumbnailId: string;
  description: string;
  price: number;
  verifyStatus: VerifyStatus;
  isDraft: boolean;
  creator: UserEntity;
  isDeleted: boolean;
  previewVideoId: string;
  includes: string;
  posts: Array<PostEntity>;
  enrolledInfos: Array<EnrolledInfoEntity>;
  sections: Array<SectionEntity>;
  courseTargets: Array<CourseTargetEntity>;
   //graphql
   numberOfEnrollments?: number
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
  userId: string;
  courseId: string;
  enrolledAt: Date;
  course: CourseEntity;
  user: UserEntity;
}

export interface LectureEntity {
  lectureId: string;
  title: string;
  thumbnailId?: string;
  lectureVideoId?: string;
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
  userId: string;
  postId: string;
  createdAt: Date;
  user: UserEntity;
  postComment: PostCommentEntity;
}

export interface PostCommentEntity {
  postCommentId: string;
  creatorId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  post: PostEntity;
  creator: UserEntity;
  html: string;
  postCommentMedias: Array<PostCommentMediaEntity>;
  postCommentLikes: Array<PostCommentLikeEntity>;
  childComments: Array<PostCommentEntity>;

  //graphql
  numberOfLikes?: number;
  numberOfReplies?: number;
  liked?: number;
}

export interface PostCommentReplyEntity {
  postCommentReplyId: string
  creatorId: string
  postCommentId: string
  createdAt: Date
  updatedAt: Date
  content: string
  postComment: PostCommentEntity
  creator: UserEntity
}

export interface SectionEntity {
  sectionId: string;
  title: string;
  courseId: string;
  createdAt: Date;
  course: CourseEntity;
  lectures: Array<LectureEntity>;
}

export interface ResourceEntity {
  resourceId: string;
  name: string;
  fileId: string;
  lectureId: string;
  createdAt: Date;
  updatedAt: Date;
  lecture: LectureEntity;
}

export interface SessionEntity {
  sessionId: string;
  userId: string;
  createdAt: Date;
  isDisabled: boolean;
  clientId: string;
  user: UserEntity;
}

export interface PostReactEntity {
  postReactId: string;
  userId: string;
  postId: string;
  liked: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: UserEntity;
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
