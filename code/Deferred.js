/** Deferred based on Promise
@return {Promise} */
let Deferred = () => {
  let res, rej;
  let deferred = new Promise( ( resolve, reject ) => {
    res = resolve;
    rej = reject;
  });
  deferred.resolve = res;
  deferred.reject = rej;

  return deferred;
};


export default Deferred;
