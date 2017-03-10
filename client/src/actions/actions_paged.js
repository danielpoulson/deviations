//SYNC 11/03/2017 DP
export const LOAD_PAGE = 'LOAD_PAGE';

export function loadPage(data) {

  return {
    type: LOAD_PAGE,
    data
  };

}
