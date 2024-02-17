export enum UserKind {
  Local = "Local",
  Google = "Google",
  Facebook = "Facebook",
}

export enum UserRole {
  User = "User",
  Moderator = "Moderator",
  Administrator = "Administrator",
}

export enum VerifyStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

export enum ContentType {
  Text = "Text",
  Video = "Video",
  Code = "Code",
  Image = "Image",
  Label = "Label",
  Application = "Application",
}

export enum ProcessStatus {
  Pending = "Pending",
  Processing = "Processing",
  Completed = "Completed",
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
  postContents: Array<Partial<PostContentEntity>>;
  postComments: Array<PostCommentEntity>;
  postReacts: Array<PostReactEntity>;
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
  thumbnailId: string;
  lectureVideoId: string;
  sectionId: string;
  processStatus: ProcessStatus;
  createdAt: Date;
  updatedAt: Date;
  section: SectionEntity;
  resources: Array<ResourceEntity>;
}

export interface PostCommentContentEntity {
  postCommentContentId: string;
  postCommentId: string;
  index: number;
  contentType: ContentType;
  content: string;
  postComment: PostCommentEntity;
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
  userId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  fatherCommentId: string | null;
  post: PostEntity;
  user: UserEntity;
  postCommentContents: Array<Partial<PostCommentContentEntity>>;
  postCommentLikes: Array<PostCommentLikeEntity>;
  childComments: Array<PostCommentEntity>;
}

export interface PostContentEntity {
  postContentId: string;
  index: number;
  content: string;
  contentType: ContentType;
  postId: string;
  post: PostEntity;
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
