/**
 * Healthcare Grid
 * Grid with different column types for healthcare data
 */
Ext.define('reExtAIDemo.view.ai.healthcareGrid.DataGrid', {
  extend: 'Ext.grid.Panel',
  xtype: 'healthcare-grid',
  controller: 'healthcare-grid-controller',
  title: 'Healthcare Grid',

  requires: [
    'reExtAIDemo.store.HealthcareDataStore',
    'reExtAIDemo.view.ai.healthcareGrid.DataGridController'
  ],

  plugins: {
    gridfilters: true 
  },

  store: {
    type: 'healthcare-data-store' 
  },

  features: [{ 
    ftype: 'summary', 
    dock: 'bottom'
  }],

  columns: [
    {
      text: 'Employee',
      dataIndex: 'name',
      flex: 1,
      minWidth: 180,
      filter: { type: 'string' },
      summaryType: 'count',
      summaryRenderer: v => `${v} staff`
    },
    {
      text: 'Department',
      dataIndex: 'department',
      width: 140,
      filter: { type: 'list' }
    },
    {
      text: 'Role',
      dataIndex: 'role',
      width: 120,
      filter: { type: 'list' }
    },
    {
      text: 'Shift',
      dataIndex: 'shift',
      width: 110,
      filter: { type: 'list' }
    },
    {
      text: 'Date',
      dataIndex: 'date',
      width: 120,
      xtype: 'datecolumn',
      format: 'Y-m-d',
      filter: { type: 'date' }
    },
    {
      text: 'Duration (hrs)',
      dataIndex: 'duration_hours',
      width: 130,
      align: 'right',
      xtype: 'numbercolumn',
      format: '0',
      filter: { type: 'number' },
      summaryType: 'sum',
      summaryRenderer: v => `${v} hrs`
    },
    {
      text: 'Status',
      dataIndex: 'status',
      width: 120,
      filter: { type: 'list' },
      renderer: (v, m) => {
        if (v === 'Assigned') m.tdStyle = 'color:#2e7d32;font-weight:600;';
        else if (v === 'Available') m.tdStyle = 'color:#1565c0;font-weight:600;';
        else if (v === 'On Leave') m.tdStyle = 'color:#8e24aa;font-weight:600;';
        return v;
      },
      summaryType: 'count',
      summaryRenderer: v => `${v} rows`
    }
  ],

  tbar: [
    {
      xtype: 'textfield',
      reference: 'queryField', 
      itemId: 'queryField',
      emptyText: 'e.g. show available doctors in the morning',
      width: 350,
      listeners: {
        specialkey: 'onQueryEnter' 
      }
    }, {
      xtype: 'button',
      text: 'Search',
      iconCls: 'fa fa-search',
      handler: 'onQueryEnter',
      reference: 'searchButton',
      itemId: 'searchButton',
      tooltip: 'Search'
    }, '->', {
      xtype: 'button',
      iconCls: 'fa fa-ban',
      text: 'Clear Filters',
      reference: 'clearFiltersButton',
      itemId: 'clearFiltersButton',
      handler: 'onClearFiltersClick'
    }
  ]
});
