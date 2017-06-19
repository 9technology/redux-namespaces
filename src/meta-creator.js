export default (namespace, actionType) => () => ({
    reduxNamespace: true,
    namespace,
    actionType,
});
