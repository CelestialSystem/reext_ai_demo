/**
 * School Grid Controller
 * Handles school grid interactions and NL query processing
 */
Ext.define('reExtAIDemo.view.ai.schoolGrid.DataGridController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.school-grid-controller',

  aiResponse: null,
  aiPrompt: null,

  onClearFiltersClick: function (btn) {
    let grid = btn.up('grid');
    let filters = grid.getPlugin('gridfilters');
    filters.clearFilters();
  },

  onQueryEnter: function (field, e) {
    if (e.getKey() === e.ENTER || field.xtype === 'button') {
      let textField;
      if (field.xtype === 'button') {
        textField = field.up().down('textfield');
      } else {
        textField = field;
      }
      let query = textField.getValue();
      let grid = field.up('grid');
      this.applyNaturalLanguageFilter(grid, query);
    }
  },

  applyNaturalLanguageFilter: function (grid, query) {
    let me = this;
    let plugin = grid.getPlugin('gridfilters');
    let store = grid.getStore();

    grid.mask('Loading...');

    Ext.Ajax.request({
      url: '/api/school-prompt',
      method: 'POST',
      jsonData: { query: query },

      success: function (response) {
        grid.unmask();
        let result = Ext.decode(response.responseText);
        me.updateResponse(result, query);

        if (result.filters) {
          plugin.clearFilters();
          Ext.Array.forEach(result.filters, function (filter) {
            if (filter.type === 'date') {
              if (filter.value.gt !== undefined) filter.value.gt = new Date(filter.value.gt);
              if (filter.value.lt !== undefined) filter.value.lt = new Date(filter.value.lt);
              if (filter.value.eq !== undefined) filter.value.eq = new Date(filter.value.eq);
            }
            plugin.addFilter([{
              dataIndex: filter.property,
              type: filter.type,
              operator: filter.operator,
              value: filter.value
            }]);
          });
        }

        if (result.sorters) {
          store.sort(result.sorters);
        }
      },

      failure: function () {
        grid.unmask();
        Ext.Msg.alert('Error', 'Could not process your query, try again.');
      }
    });
  },

  updateResponse: function (response, query) {
    this.getReferences().responseButton.setDisabled(false);
    this.aiResponse = response;
    this.aiPrompt = query;
  },

  viewResponse: function () {
    let me = this;
    let wnd = Ext.create('Ext.window.Window', {
      title: 'Response from server',
      width: 600,
      maxWidth: window.innerWidth - 50,
      height: 400,
      modal: true,
      layout: { type: 'vbox', align: 'stretch' },
      items: [{
        xtype: 'panel',
        height: 48,
        bodyPadding: 8,
        bodyStyle: { backgroundColor: '#eee' },
        html: '<strong>Prompt: </strong>' + (me.aiPrompt || 'NOT SET')
      }, {
        xtype: 'panel',
        flex: 1,
        scrollable: true,
        bodyPadding: 16,
        html: '<pre>' + JSON.stringify(me.aiResponse || 'NOT SET', null, 4) + '</pre>',
        bodyStyle: { fontFamily: 'monospace', fontSize: '13px', backgroundColor: '#fff', color: '#444' }
      }],
      buttons: ['->', { text: 'Close', handler: function () { wnd.close(); } }]
    });
    wnd.show();
  }
});
