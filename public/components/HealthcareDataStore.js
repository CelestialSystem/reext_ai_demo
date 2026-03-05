/**
 * reExtAIDemo.store.HealthcareDataStore
 */
Ext.define('reExtAIDemo.store.HealthcareDataStore', {
  extend: 'Ext.data.Store',
  alias: 'store.healthcare-data-store',

  fields: [
    { name: 'employee_id', type: 'string' },
    { name: 'name', type: 'string' },
    { name: 'department', type: 'string' },
    { name: 'role', type: 'string' },
    { name: 'shift', type: 'string' },
    { name: 'date', type: 'date' },
    { name: 'duration_hours', type: 'int' },
    { name: 'status', type: 'string' }
  ],

  remoteFilter: false,
  autoLoad: true,

  proxy: {
    type: 'ajax',
    url: '/api/healthcare-data',
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'count',
      successProperty: 'success'
    }
  }
});
