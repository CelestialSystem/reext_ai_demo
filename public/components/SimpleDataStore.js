/**
 * reExtAIDemo.store.SimpleDataStore
 * Simple data store for user records
 */
Ext.define('reExtAIDemo.store.SimpleDataStore', {
  extend: 'Ext.data.Store',
  alias: 'store.simple-data-store',

  fields: [
    { name: 'name', type: 'string' },
    { name: 'age', type: 'int' },
    { name: 'email', type: 'string' },
    { name: 'status', type: 'string' },
    { name: 'country', type: 'string' },
    { name: 'last_month_sales', type: 'number' },
    { name: 'created_at', type: 'date' }
  ],

  remoteFilter: false,
  autoLoad: true,

  proxy: {
    type: 'ajax',
    url: '/api/simple-data',  // Use relative URL (proxy will route to localhost:8080)
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'count',
      successProperty: 'success'
    }
  },

  pageSize: 25
});
