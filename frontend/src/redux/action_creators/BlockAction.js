const BlockAction = {
  fetchTransactionsByBlockHeight: (data) => {
    return {
      type: "TEST",
      payload: {
        data
      }
    }
  }
}

export default BlockAction;