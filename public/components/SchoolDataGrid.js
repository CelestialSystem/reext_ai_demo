/**
 * School Grid
 * Grid with different column types for school data
 */
Ext.define('reExtAIDemo.view.ai.schoolGrid.DataGrid', {
  extend: 'Ext.grid.Panel',
  xtype: 'school-grid',
  controller: 'school-grid-controller',
  title: 'School Grid',

  requires: [
    'reExtAIDemo.store.SchoolDataStore',
    'reExtAIDemo.view.ai.schoolGrid.DataGridController'
  ],

  plugins: {
    gridfilters: true 
  },

  store: {
    type: 'school-data-store' 
  },

  columns: [
    {
      text: 'Student ID',
      dataIndex: 'student_id',
      width: 120,
      filter: { type: 'string' }
    },
    {
      text: 'Full Name',
      dataIndex: 'full_name',
      flex: 1,
      minWidth: 180,
      filter: { type: 'string' },
      summaryType: 'count',
      summaryRenderer: v => `${v} students`
    },
    {
      text: 'Grade',
      dataIndex: 'grade',
      width: 100,
      align: 'center',
      filter: { type: 'list' }
    },
    {
      text: 'Avg. Score',
      dataIndex: 'avg_score',
      width: 120,
      align: 'right',
      xtype: 'numbercolumn',
      format: '0',
      filter: { type: 'number' },
      renderer: function (value) {
        if (value < 60) {
          return `<span style="color:#b71c1c; font-weight:600;">${value}</span>`;
        }
        return value;
      }
    },
    {
      text: 'Letter',
      dataIndex: 'letter_grade',
      width: 100,
      align: 'center',
      filter: { type: 'list' },
      renderer: function (value) {
        if (value === 'F') {
          return `<span style="color:#b71c1c; font-weight:600;">${value}</span>`;
        }
        return value;
      }
    },
    {
      text: 'Age',
      dataIndex: 'age',
      width: 90,
      align: 'right',
      xtype: 'numbercolumn',
      format: '0',
      filter: { type: 'number' }
    },
    {
      text: 'Gender',
      dataIndex: 'gender',
      width: 110,
      filter: { type: 'list' }
    },
    {
      text: 'Enrollment Date',
      dataIndex: 'enrollment_date',
      width: 140,
      xtype: 'datecolumn',
      format: 'Y-m-d',
      filter: { type: 'date' }
    },
    {
      text: 'Status',
      dataIndex: 'status',
      width: 120,
      filter: { type: 'list' },
      renderer: (v) => {
        let color = '#999';
        if (v === 'Active') color = '#2e7d32';
        if (v === 'Graduated') color = '#1565c0';
        if (v === 'Withdrawn') color = '#8e24aa';
        return `<span style="color:${color};font-weight:600;">${v}</span>`;
      }
    },
    {
      text: 'Guardian',
      dataIndex: 'guardian_name',
      width: 180,
      filter: { type: 'string' }
    },
    {
      text: 'Guardian Contact',
      dataIndex: 'guardian_contact',
      width: 150,
      filter: { type: 'string' }
    }
  ],

  tbar: [
    {
      xtype: 'textfield',
      reference: 'queryField', 
      itemId: 'queryField',
      emptyText: 'e.g. show students in grade 9',
      width: 350,
      listeners: {
        specialkey: 'onQueryEnter' 
      }
    },
    {
      xtype: 'button',
      text: 'Search',
      iconCls: 'fa fa-search',
      handler: 'onQueryEnter',
      reference: 'searchButton',
      itemId: 'searchButton',
      tooltip: 'Search'
    },'->', {
      xtype: 'button',
      iconCls: 'fa fa-ban',
      text: 'Clear Filters',
      reference: 'clearFiltersButton',
      itemId: 'clearFiltersButton',
      handler: 'onClearFiltersClick'
    }
  ]
});
