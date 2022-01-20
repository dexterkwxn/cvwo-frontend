const InitialState = {
  blockTransactionsData: [],
  fetchBlockTransactionsStatus: null,
  internalContractTransactionsData: [],
  fetchInternalContractTransactionsStatus: null,
};

const BlockReducer = (state = InitialState, action) => {
  switch (action.type) {
    case "TEST":
      return {
        ...state,
      }
    default:
      return {
        ...state
      };
  }
};

export default BlockReducer;