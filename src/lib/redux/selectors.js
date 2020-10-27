import { createSelector } from 'reselect';

import keyBy from 'lodash/keyBy'
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';

import { processArrayData, chunkArrayData } from '../helpers';

const defaultFilters = {
  random : false,
  limit : false,
  filter : null,
  sort : false,
  mobile : 4,
  columns : false
}

export const getLocale = state => state.app.locale;
export const getLinkedInToken = state => state.social.linkedin;
export const getCart = state => state.app.cart;
export const getResources = state => state.resources;
export const getLists = state => state.lists;
export const getFaqs = state => state.visuals.faqs;
export const getSettings = state => state.settings;
export const getBoothsSelected = state => state.boothsSelected

/*
RESOURCES
*/
export const getTickets = state => state.resources.tickets
export const getFormdata = state => state.resources.formdata
export const getTicketGroups = state => state.resources.ticketgroups
export const getBookingmap = state => state.resources.bookingmap
export const getPhotos = state => state.resources.photos
export const getExhibitors = (state, props) => state.resources.exhibitors
export const getAllExhibitors = (state, props) => state.resources.allexhibitors
export const getCompanies = (state, props) => state.resources.companies
export const getPresenters = (state, props) => state.resources.presenters
export const getAllPresenters = (state, props) => state.resources.presenters_all
export const getVips = (state, props) => state.resources.vips
export const getPartners = (state, props) => state.resources.partners


export const getCallForPapers = (state, props) => state.resources.callforpapers
export const getJurors = (state, props) => state.resources.jurors
export const getContestantCompanies = (state, props) => state.resources.contestant_companies
export const getContestantCompaniesAll = (state, props) => state.resources.contestant_companies_all
export const getVotes = (state, props) => state.resources.votes
export const getPosts = (state, props) => state.resources.posts
export const getAdminReport = (state, props) => "report" in state.resources ? state.resources.report : []

/*
RESOURCES
*/


export const getFilteringProps = (state, props) => ({...defaultFilters, ...props})

export const getViewPortWidth = (state) => state.app.width || "xs"



export const ExhibitorKeywordsSelector = createSelector(
  getExhibitors,
  exhibitors => {
    const allUsedKeywords = [].concat.apply([], (exhibitors || []).map(e => "keywords" in e.profile && Array.isArray(e.profile.keywords) ? e.profile.keywords : []))
    const uniqueKeywords = [...new Set(allUsedKeywords )];
    return uniqueKeywords
  }
)

export const TicketsSelector = createSelector(
  getTickets,
  tickets => tickets
)

export const SortedTicketsSelector = createSelector(
  getTickets,
  tickets => sortBy(tickets, ['start'])
)

// export const getRecord = (state, props) => {
//   const key = `${props.endpoint}/${props.id}`
//   return key in state.resources ? state.resources[key] : {}
// }

export const SettingsSelector = createSelector(
  getSettings,
  (_, props) => props.name,
  (settings, name) => name in settings ? settings[name] : null
)

export const SingleRecordSelector = createSelector(
  getResources,
  (_, props) => "id" in props && props.id > 0 ? `${props.endpoint}/${props.id}` : null,
  (_, props) => "slug" in props && props.slug && props.slug.length > 3 ? `${props.endpoint}/${props.slug}` : null,
  (resources, id, slug) => {

    if(id && id in resources){
      return resources[id]
    }

    if(slug && slug in resources){
      return resources[slug]
    }

    return {}

  }
)

export const FilteredExhibitors = createSelector(
  getExhibitors,
  getFilteringProps,
  (exhibitors, props) => processArrayData(exhibitors, props)
)

export const FilteredAllExhibitors = createSelector(
  getAllExhibitors,
  getFilteringProps,
  (exhibitors, props) => processArrayData(exhibitors, props)
)

export const MobileAwareFilteredAllExhibitors = createSelector(
  FilteredAllExhibitors,
  getViewPortWidth,
  getFilteringProps,
  (exhibitors, width, props) => {

    if(props.columns){
      exhibitors = chunkArrayData(exhibitors, width)

    //  console.log(exhibitors)
    }

    if ((width === 'xs' || width === 'sm') && "mobile" in props && props.mobile && exhibitors.length > props.mobile) {
     exhibitors = exhibitors.slice(0, props.mobile);
   }
   return exhibitors
  }
)

/**
 * COMPANIES
 */

export const FilteredCompanies = createSelector(
  getCompanies,
  getFilteringProps,
  (companies, props) => processArrayData(companies, props)
)

export const KeyedCompaniesSelector = createSelector(
  getCompanies,
  (companies) => keyBy(companies, "id")
)

export const KeyedBySlugCompaniesSelector = createSelector(
  getCompanies,
  (companies) => keyBy(companies, "slug")
)

export const SingleCompanySelector = createSelector(
  KeyedCompaniesSelector,
  KeyedBySlugCompaniesSelector,
  (_, props) => "id" in props && props.id > 0 ? props.id : null,
  (_, props) => "slug" in props && props.slug && props.slug.length > 3 ? props.slug : null,
  (keyedById, keyedBySlug, id, slug) => {

    if(id && id in keyedById){
      return keyedById[id]
    }

    if(slug && slug in keyedBySlug){
      return keyedBySlug[slug]
    }

    return {}

  }
)

/**
 * COMPANIES
 */

export const ExhbitorsWithOffer = createSelector(
  getExhibitors,
  (exhibitors) => exhibitors.filter(ex => "expo" in ex.profile && ex.profile.expo.length > 15 && ex.profile.expo.replace(/(<([^>]+)>)/ig,"").length > 10 )
)

export const PromotedExhibitorOffers = createSelector(
  ExhbitorsWithOffer,
  (exhibitors_with_offer) => exhibitors_with_offer.filter(ex => ex.promo)
)

export const StandardExhibitorOffers = createSelector(
  ExhbitorsWithOffer,
  PromotedExhibitorOffers,
  (exhibitors_with_offer, promoted) => {
    const promotedKeys = keyBy(promoted, "id")
    return exhibitors_with_offer.filter(ex => ! (ex.id in promotedKeys ))
  }
)

/*

    exhibitor.instances.filter(purchase => purchase.formdata && "id" in purchase.formdata).map(purchase => purchase.formdata.id)

*/



export const MobileAwareFilteredExhibitors = createSelector(
  FilteredExhibitors,
  getViewPortWidth,
  getFilteringProps,
  (exhibitors, width, props) => {

    if(props.columns){
      exhibitors = chunkArrayData(exhibitors, width)

    //  console.log(exhibitors)
    }

    if ((width === 'xs' || width === 'sm') && "mobile" in props && props.mobile && exhibitors.length > props.mobile) {
     exhibitors = exhibitors.slice(0, props.mobile);
   }
   return exhibitors
  }
)




/*
PARTNERS - START
*/


export const FilteredPartners = createSelector(
  getPartners,
  getFilteringProps,
  (partners, props) => processArrayData(partners, props)
)

export const MobileAwareFilteredPartners = createSelector(
  FilteredPartners,
  getViewPortWidth,
  getFilteringProps,
  (partners, width, props) => {

    if ((width === 'xs' || width === 'sm') && "mobile" in props && props.mobile && partners.length > props.mobile) {
      partners = partners.slice(0, props.mobile);
    }
    return partners

  }
)



/*
VISITORS - START
*/


export const FilteredVisitors = createSelector(
  getVips,
  getFilteringProps,
  (visitors, props) => processArrayData(visitors, props)
)

export const MobileAwareFilteredVisitors = createSelector(
  FilteredVisitors,
  getViewPortWidth,
  getFilteringProps,
  (visitors, width, props) => {

    if ((width === 'xs' || width === 'sm') && "mobile" in props && props.mobile && visitors.length > props.mobile) {
      visitors = visitors.slice(0, props.mobile);
    }
    return visitors

  }
)


/*
PRESENTERS - START
*/

export const FilteredPresenters = createSelector(
  getPresenters,
  getFilteringProps,
  (presenters, props) => processArrayData(presenters, props)
)

export const MobileAwareFilteredPresenters = createSelector(
  FilteredPresenters,
  getViewPortWidth,
  getFilteringProps,
  (presenters, width, props) => {

    if ((width === 'xs' || width === 'sm') && "mobile" in props && props.mobile && presenters.length > props.mobile) {
      presenters = presenters.slice(0, props.mobile);
    }
    return presenters

  }
)

export const KeyedPresentersSelector = createSelector(
  getPresenters,
  (presenters) => keyBy(presenters, "id")
)

export const getPresenterByIdSelector = createSelector(
  KeyedPresentersSelector,
  (_, props) => "id" in props ? props.id : null,
  (keyed, id) => id && id in keyed ? keyed[id] : {}
)

/*
PRESENTERS - END
*/

export const KeyedFormdataSelector = createSelector(
  getFormdata,
  (formdata) => keyBy(formdata, "id")
)

export const KeyedTicketGroupsSelector = createSelector(
  getTicketGroups,
  (ticketgroups) => keyBy(ticketgroups, "id")
)

export const FilteredTicketGroupsSelector = createSelector(
  getTicketGroups,
  (state, props) => props.allowedGroupIds,
  (ticketgroups, ids) => Array.isArray(ids) ? ticketgroups.filter(tg => ids.includes(tg.id)) : ticketgroups
)

export const getTicketGroup = createSelector(
  KeyedTicketGroupsSelector,
  (state, props) => props.groupId,
  (groups, groupId) => groups[groupId]
)

export const getNonPastTickets = createSelector(
  getTicketGroup,
  (ticketgroup) => ticketgroup.tickets.filter(t => t.errors.indexOf("overdue") === -1)
)

export const getTicketsSortedByStart = createSelector(
  getNonPastTickets,
  (tickets) => sortBy(tickets, ['start'])
)


export const BookingMapResourcesSelector = createSelector(
  KeyedFormdataSelector,
  KeyedTicketGroupsSelector,
  getBookingmap,
  (formdata, ticketgroups, bookingmap) => ({formdata, ticketgroups, bookingmap})
)

export const BookingMapSelector = createSelector(
  BookingMapResourcesSelector,
  getBoothsSelected,
  (resources, boothsSelected) => ({...resources, boothsSelected})
)

export const FilteredByKeywordExhibitors = createSelector(
  FilteredExhibitors,
  getFilteringProps,
  (exhibitors, props) => exhibitors.filter(e => "keywords" in e.profile && Array.isArray(e.profile.keywords) && e.profile.keywords.includes(props.keyword))

  //
  //
  //
  // let boothIds = []
  //
  // data.forEach(exhibitor => {
  //
  //   const formdata = exhibitor.instances.filter(purchase => purchase.formdata && "id" in purchase.formdata).map(purchase => purchase.formdata.id)
  //
  //   if(formdata.length){
  //     boothIds = boothIds.concat(formdata)
  //   }
  //
  // })

)
