const state = {
    curttennm : 0,
 
};

const actions = {

};

const mutations = {
    CITY_INFO(state , payload){
        state.curttennm = payload.curttennm;
    
    }
};

export default {
    namespaced : true,
    state,
    actions,
    mutations
}