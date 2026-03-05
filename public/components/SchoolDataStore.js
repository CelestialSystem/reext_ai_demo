/**
 * reExtAIDemo.store.SchoolDataStore
 */
Ext.define('reExtAIDemo.store.SchoolDataStore', {
  extend: 'Ext.data.Store',
  alias: 'store.school-data-store',

  fields: [
    { name: 'student_id', type: 'string' },
    { name: 'full_name', type: 'string' },
    { name: 'grade', type: 'string' },
    { name: 'age', type: 'int' },
    { name: 'gender', type: 'string' },
    { name: 'enrollment_date', type: 'date' },
    { name: 'status', type: 'string' },
    { name: 'guardian_name', type: 'string' },
    { name: 'guardian_contact', type: 'string' },
    { name: 'avg_score', type: 'number' },
    { name: 'letter_grade', type: 'string' }
  ],

  remoteFilter: false,
  autoLoad: true,

  proxy: {
    type: 'ajax',
    url: '/api/school-data',
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'count',
      successProperty: 'success'
    }
  }
});
