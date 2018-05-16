/** Deferred based on Promise
@function
@return {Promise} */
module.exports = () => {
  let res, rej;
  let deferred = new Promise( ( resolve, reject ) => {
    res = resolve;
    rej = reject;
  });
  deferred.resolve = res;
  deferred.reject = rej;

  return deferred;
};
