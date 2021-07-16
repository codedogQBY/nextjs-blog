export type State = 0 | 1 | 2 | 3 | string

// 分页
export interface Pagination {
  current_page?: number
  page_size?: number
  total?: number
  total_page?: number
  sort?: number,
}

// 公用
interface Common {
  /** 唯一标识 */
  readonly _id?: string,

  /** 发布日期 */
  readonly create_at?: Date,

  /** 修改日期 */
  readonly update_at?: Date,

  /** 删除中... */
  deleteing?: boolean
}

// 评论产生
export interface Author {
    name: string,
    email?: string,
    site?: string
  }

// 博主数据
export interface User {

    /** 名称 */
    name: string,

    /** 用户签名 */
    slogan: string,

    /** 头像 */
    gravatar: string
  }

 // 标签
 export interface Tag extends Common {
    /** 名称 */
    name: string,

    /** 描述 */
    descript: string,

    /** 排序 */
    sort?: number,

    /** 文章数量 */
    count?: number
}


// 英雄版（留言墙）
export interface Hero extends Common {
    /** 名称 */
    name: string,

    /** 内容 */
    content: string,
  }

  // 网站信息
  export interface Option {
    /** 唯一标识 */
    readonly _id: string,

    /** 网站标题 */
    title: string,

    /** 副标题 */
    sub_title: string,

    /** 关键字 */
    keyword: string,

    /** 描述 */
    descript: string,

    /** 地址 */
    url: string,

    /** email */
    email: string,

    /** 备案号 */
    icp: string
  }

  // 友链
  export interface Link extends Common {
  // 友链名称
  name: string

  // 链接
  url: string

  // 签名
  slogan?: string;

  // 头像
  gravatar: string;

  // 邮箱地址
  email?: string
  }

  // 评论
  export interface Comment extends Common {

    name?: string

    /** 评论文章所在 id */
    post_id?: number,

    /** 父级 id */
    pid?: number,

    /** 内容 */
    content?: string,

    /** 被赞数 */
    likes?: number,

    /** ip */
    ip?: string,

    /** 用户位置 */
    city?: String,
    range?: String,
    country?: String,

    /** 回复名*/
    replayName?:string,

    /** 用户 UA */
    agent?: string,

    /** 评论产生 */
    author?: Author,

    /** 评论状态 */
    state?: State
    /**文章id */
    id?:number
    children?:Comment[]
  }

  // 文章
  export interface Article extends Common {

    /** 标题 */
    title: string,

    /** 关键字 */
    keyword: string,

    /** 描述 */
    descript: string,

    /** 内容 */
    content?: string,

    /** 状态 */
    state: State,

    /** 公开状态 */
    publish: State,

    /** 类别 */
    type: State,

    /** 缩略图 */
    thumb: string,

    /** 其他 */
    [propName: string]: any
  }

  // axios 返回数据
  export interface AxiosResponse {
    data: AjaxResponse
  }

  // 请求接口数据
  export interface AjaxResponse {
    /**
     * 状态码
     * @type { number }
     */
    code: number,

    /**
     * 数据
     * @type { any }
     */
    result: any,

    /**
     * 消息
     * @type { string }
     */
    message: string
  }