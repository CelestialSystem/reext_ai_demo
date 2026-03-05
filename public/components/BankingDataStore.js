/**
 * reExtAIDemo.store.BankingDataStore
 * --------------------
 * This is a data store for banking records in the application.
 * It defines the data fields and configures an Ajax proxy to load JSON data
 * from a backend endpoint (`/api/banking-data`).
 */
Ext.define('reExtAIDemo.store.BankingDataStore', {
  extend: 'Ext.data.Store',
  alias: 'store.banking-data-store',

  fields: [
    { name: 'loan_id', type: 'string' },
    { name: 'borrower_name', type: 'string' },
    { name: 'loan_type', type: 'string' },
    { name: 'principal_amount', type: 'number' },
    { name: 'interest_rate', type: 'number' },
    { name: 'remaining_balance', type: 'number' },
    { name: 'next_payment_due', type: 'date' },
    { name: 'status', type: 'string' }
  ],

  remoteFilter: false,
  autoLoad: true,

  proxy: {
    type: 'ajax',
    url: '/api/banking-data',
    reader: {
      type: 'json',
      rootProperty: 'data',
      totalProperty: 'count',
      successProperty: 'success'
    }
  }
});
