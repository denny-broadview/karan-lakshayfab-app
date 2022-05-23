const APP_SCHEME = 'samsungelite://'



const TAB_IDS = {
  TAB_HOME: 10,
  TAB_SALES_TRACKING: 20,
  TAB_LEADS: 30,
  TAB_LEARN: 40,
  TAB_REWARDS: 50,
  TAB_COMMUNITY: 60,
  TAB_HELP: 70,
  TAB_ACTIVITIES: 10,
  TAB_COURSES: 20,
  TAB_DEMOS: 30,
  TAB_RESOURCES: 40,
  TAB_ARTICLES: 50,
  TAB_POINTS: 10,
  TAB_REFERRALS: 20,
  TAB_BADGES: 30,
  TAB_SPAY: 40,
  TAB_LEADERBOARDS: 50,
}

let hostUrl='http://lakshayfabrics.in'
const constants = Object.assign(TAB_IDS, {
  APP_NAME:"Lakshay Fabrics",
  HOST_URL:'http://lakshayfabrics.in',
  BASE_URL:'http://lakshayfabrics.in/api',
  ACTIVE_INACTIVE_URL:'Fabrics/Active_inactive',

  ROLE:{
    CUSTOMER:'Customer',
    ADMIN:'Admin',
    DISPATCHER:'Dispatcher'
  },
  SIGN_UP_TYPES:{
    WEEKLY_OFF_DAY:'Weekly_off_day',
    DOB:'Dob',
    MARRIAGE_ANNIVERSARY:'Marriage_anniversary',
    DISPATCHED_DATE:'Dispatched_Date',
    DELIVERY_DATE:'Delivery_Date'
  },

  IMAGES_TYPES:{
    fabrics:'fabrics',
    catalog:'catalog',
    product:'products',
    gallery:'gallery',
    album:'album',
    slider:'slider'
  },

  CRUD_OPERATION_TYPES:{
    ADD_DATA:'add_data',
    UPDATE:'update',
    DELETE:'delete'
  },

  IMAGES_URL:{
    SMALL_IMAGE:'{0}/assets/uploads/{1}/thumbs_small/{2}', // => wiCdth: 89, height: 99
    MEDIUM_IMAGE:'{0}/assets/uploads/{1}/thumbs_medium/{2}',//=> width: 134, height: 118',
    REGULAR_IMAGE:'{0}/assets/uploads/{1}/thumbs/{2}',//  => width: 171, height: 136
    LARGE_IMAGE:'{0}/assets/uploads/{1}/thumbs_large/{2}',//=> width: 330, height: 226
    X_LARGE_IMAGE:'{0}/assets/uploads/{1}/thumbs_big/{2}', //{filename} => width: 330, height: 184,
    GALLERY_IMAGE:'{0}/assets/uploads/{1}/thumbs/{2}',//  =>

  },
  ADMIN:{
    OFFSET_VALUE:"10",
    NEW:'new',
    APPROVE:'Approve',
    REJECT:'Reject',
    SHIPPED:'Shipped',
    DELIVERED:'Shipped'
  },
  FABRIC:{
    ACTIVE:"Active",
    INACTIVE:"Deactivate"
  }

});

export default constants
