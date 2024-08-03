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
  Draft = "draft",
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
  roleId: string;
  name: string;
  accountId: string;
  accountRoles: AccountEntity;
  createdAt: Date;
  isDisabled: boolean;
  updatedAt: Date;
}
export interface AccountRatingDTO {
  numberOf1StarRatings: number;
  numberOf2StarRatings: number;
  numberOf3StarRatings: number;
  numberOf4StarRatings: number;
  numberOf5StarRatings: number;
  overallAccountRating: number;
  totalNumberOfRatings: number;
}

export interface AccountEntity {
  accountId: string;
  email: string;
  password?: string;
  avatarId?: string;
  avatarUrl?: string;
  phoneNumber?: string;
  balance: number;
  bio: string;
  cart: CartEntity;
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
  accountRatings?: AccountRatingDTO;
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
  liked?: boolean;
  isRewardable: boolean;
  isCompleted: boolean;
  isPostOwner: boolean;
  numberOfRewardableCommentsLeft: number;
  numberOfRewardableLikesLeft: number;
  numberOfReports: number;
}

export enum CertificateStatus {
  Cannot = "cannot",
  Getable = "getable",
  Gotten = "gotten",
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
  isCreator: boolean;
  isDeleted: boolean;
  previewVideoId: string;
  includes: string;
  createdAt: Date;
  updatedAt: Date;
  courseCategories: Array<CourseCategoryEntity>;
  courseTargets: Array<CourseTargetEntity>;
  courseReview: CourseReviewEntity;
  posts: Array<PostEntity>;
  enrolledInfos: Array<EnrolledInfoEntity>;
  sections: Array<SectionEntity>;
  receivedWalletAddress?: string;
  courseRate: number;
  courseRatings: CourseRating;
  duration: number;
  //graphql
  numberOfEnrollments?: number;
  enrolled?: boolean;
  numberOfQuizzes?: number;
  numberOfLessons?: number;
  numberOfResources?: number;
  numberOfReports: true,
  certificateStatus?: CertificateStatus;
  certificate?: CertificateEntity;
  totalContents?: number
  completedContents?: number
  students?: Array<AccountEntity>
}

export interface CertificateEntity {
  certificateId: string;
  courseId: string;
  accountId: string;
  createdAt: Date;
  expiredDate: Date;
  account: AccountEntity;
  course: CourseEntity;
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

export interface CourseRating {
  numberOf1StarRatings: number;
  numberOf2StarRatings: number;
  numberOf3StarRatings: number;
  numberOf4StarRatings: number;
  numberOf5StarRatings: number;
  overallCourseRating: number;
  totalNumberOfRatings: number;
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
  thumbnailId?: string;
  lessonVideoId?: string;
  sectionId: string;
  accountProgresses: ProgressEntity;
  processStatus: ProcessStatus;
  videoType: VideoType;
  durationInSeconds: number;
  createdAt: Date;
  updatedAt: Date;
  section: SectionEntity;
  resources: Array<ResourceEntity>;
  numberOfViews: number;
  description: string;
  enableSeek?: boolean;
}

export interface ProgressEntity {
  progressId: string;
  account: AccountEntity;
  accountId: string;
  lesson: LessonEntity;
  lessonId: string;
}

export enum SectionContentType {
  Lesson = "lesson",
  Quiz = "quiz",
  Resource = "resource",
}

export enum CompleteState {
  Completed = "completed",
  Failed = "failed",
  Undone = "undone",
}

export interface SectionContentEntity {
  sectionContentId: string;
  sectionId: string;
  lessonId: string;
  title: string;
  quizId: string;
  resourceId: string;
  type: SectionContentType;
  accountProgresses: ProgressEntity;
  position: number;
  createdAt: Date;
  updatedAt: Date;

  section: SectionEntity;
  lesson: LessonEntity;
  resource: ResourceEntity;
  quiz: QuizEntity;
  completeState: CompleteState;
}

export interface QuizEntity {
  quizId: string;
  timeLimit: number;
  createdAt: Date;
  updatedAt: Date;
  sectionContent: SectionContentEntity;
  highestScoreRecorded: number;
  totalNumberOfAttempts: number;
  passingPercent: number;
  isPassed: boolean;
  lastAttemptScore: number;
  questions: Array<QuizQuestionEntity>;
  quizAttempts: QuizAttemptEntity;
  description: string;
  activeQuizAttempt?: QuizAttemptEntity;
  blockAttempt?: boolean;
  blockAttemptTimeWait?: Date;
}

export interface QuizQuestionEntity {
  quizQuestionId: string;
  quizId: string;
  quiz: QuizEntity;
  createdAt: Date;
  updatedAt: Date;
  question: string;
  point: number;
  position: number;
  mediaId: string
  mediaType: MediaType
  answers: Array<QuizQuestionAnswerEntity>;
  questionMedias: Array<QuizQuestionMediaEntity>;
  answered?: boolean;
  numberOfCorrectAnswers?: number;
  corrected?: true;
}

export interface QuizQuestionAnswerEntity {
  quizQuestionAnswerId: string;
  quizQuestionId: string;
  quizQuestion: QuizQuestionEntity;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  position: number;
  isCorrect: boolean;
  attempt: QuizAttemptEntity;
  selected?: boolean;
  lastAnswer: boolean
}

export interface QuizAttemptAnswerEntity {
  quizAttemptAnswerId: string;
  quizAttemptId: string;
  quizQuestionAnswerId: string;
  createdAt: Date;
  updatedAt: Date;
  quizAttempt: QuizAttemptEntity;
  quizQuestionAnswer: QuizQuestionAnswerEntity;
}

export interface QuizAttemptEntity {
  quizAttemptId: string;
  quizId: string;
  receivedPercent?: number;
  isPassed?: boolean;
  account: AccountEntity;
  accountId: string;
  attemptStatus: string;
  createdAt: Date;
  updatedAt: Date;
  quiz: QuizEntity;
  currentQuestionPosition: number;
  attemptAnswers: Array<QuizAttemptAnswerEntity>;
  timeLeft: number;
  receivedPoints: number;
  totalPoints: number;
  observedAt: Date;
}

export interface QuizQuestionMediaEntity {
  quizQuestionMediaId: string;
  quizQuestionId: string;
  quizQuestion: QuizQuestionEntity;
  mediaId: string;
  mediaType: MediaType;
  position: number;
  createdAt: Date;
  updatedAt: Date;
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
  liked?: boolean;
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

export enum LockState {
  Completed = "completed",
  InProgress = "inProgress",
  Locked = "locked",
}

export interface SectionEntity {
  sectionId: string;
  title: string;
  position: number;
  courseId: string;
  createdAt: Date;
  course: CourseEntity;
  contents: Array<SectionContentEntity>;
  //graphql
  lockState?: LockState;
}

export interface ResourceEntity {
  resourceId: string;
  description: string;
  attachments: Array<ResourceAttachmentEntity>;
  updatedAt: Date;
  lesson: LessonEntity;
  sectionContent: SectionContentEntity;
}

export interface ResourceAttachmentEntity {
  resourceAttachmentId: string;
  resourceId: string;
  name: string;
  fileId: string;
  createdAt: Date;
  updatedAt: Date;
  resource: ResourceEntity;
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

export interface CategoryRelationEntity {
  categoryRelationId: string;
  categoryId: string;
  category: CategoryEntity;
  categoryParentId: string;
  categoryParentRelations: Array<CategoryRelationEntity>;
  categoryParent: CategoryEntity;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryEntity {
  categoryId: string;
  name: string;
  imageId: string;
  level: number;
  createdAt: Date;
  updatedAt: Date;
  categoryParentRelations: Array<CategoryRelationEntity>;
  categoryRelations: Array<CategoryRelationEntity>;
  courseCategories: Array<CourseCategoryEntity>;
}

export interface CourseCategoryEntity {
  courseCategoryId: string;
  createdAt: Date;
  updatedAt: Date;
  courseId: string;
  categoryId: string;
  course: CourseEntity;
  category: CategoryEntity;
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
  cartId: string;
  cartCourses: Array<CartCourseEntity>;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  account: AccountEntity;
}
export interface CartCourseEntity {
  cartCourseId: string;
  cartId: string;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
  course: CourseEntity;
  cart: CartEntity;
}
export interface CourseReviewEntity {
  courseReviewId: string;
  content: string;
  courseId: string;
  course?: CourseEntity;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  accountId: string;
  account: AccountEntity;
}

export interface ReportAccountEntity {
  reportAccountId: string;
  reportedId: string;
  reporterId: string;
  title: string;
  description: string;
  processNote: string;
  processStatus: string;
  reporterAccount: AccountEntity;
  reportedAccount: AccountEntity;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportCourseEntity {
  reportCourseId: string;
  courseId: string;
  accountId: string;
  title: string;
  numberOfReports: number;
  description: string;
  processNote: string;
  processStatus: string;
  reporterAccount: AccountEntity;
  reportedCourse: CourseEntity;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportPostEntity {
  reportPostId: string;
  postId: string;
  title: string;
  accountId: string;
  description: string;
  processNote: string;
  processStatus: string;
  reporterAccount: AccountEntity;
  reportedPost: PostEntity;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReportPostCommentEntity {
  reportPostCommentId: string;
  postCommentId: string;
  accountId: string;
  title: string;
  description: string;
  processNote: string;
  processStatus: string;
  reporterAccount: AccountEntity;
  reportedPostComment: PostCommentEntity;
  createdAt: Date;
  updatedAt: Date;
}

export enum TransactionType {
  Buy = "buy",
  Deposit = "deposit",
  Withdraw = "withdraw",
}

export interface TransactionEntity {
  transactionId: string;
  type: TransactionType;
  accountId: string;
  amountDepositedChange: number;
  amountOnChainChange: number;
  transactionHash: string;
  payPalOrderId: string;
  account: AccountEntity;
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationEntity {
  senderId: string;
  receiverId: string;
  title: string;
  description: string;
  sender: AccountEntity;
  receiver: AccountEntity;
  viewed: boolean;
  referenceLink: string;
  notificationId: string;
  type: string;
  course: CourseEntity;
  courseId: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}
