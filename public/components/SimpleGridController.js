/**
 * reExtAIDemo.view.ai.simpleGrid.DataGridController
 * Controller for the simple grid with NL query support
 */
Ext.define('reExtAIDemo.view.ai.simpleGrid.DataGridController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.simple-grid-controller',

  config: {
    serverUrl: '' // Use relative URLs (proxy handles routing)
  },

  init: function() {
    console.log('📊 SimpleGrid Controller initialized');
  },

  onClearFiltersClick: function (btn) {
    let grid = btn.up('grid');
    let filters = grid.getPlugin('gridfilters');
    filters.clearFilters();
  },

  onQueryEnter: function (field, e) {
    if (e.getKey() === e.ENTER || field.xtype === 'button') {
       let textField;

        if (field.xtype === 'button') {
            // Find the text field near the button
            textField = field.up().down('textfield');
        } else {
            textField = field;
        }

        let query = textField.getValue();
        let grid = field.up('grid');
        this.applyNaturalLanguageFilter(grid, query);
    }
  },

  /**
   * Connects to the backend and retreives filters and sorters based 
   * on the natural language prompt
   * 
   * It does apply certain fixes if required
   * @param {*} grid 
   * @param {*} query 
   */
  applyNaturalLanguageFilter: function (grid, query) {
    let me=this;
    let plugin = grid.getPlugin('gridfilters');
    let store = grid.getStore();

    grid.mask('Loading...');

    // In this example, the interpret-prompt endpoint was created with NodeJS
    Ext.Ajax.request({
       url: '/api/simplegrid-prompt',
      method: 'POST',
      jsonData: { query: query },

      success: function (response) {
        grid.unmask();
        let result = Ext.decode(response.responseText);

        me.updateResponse(result,query);

        if (result.filters) {
          plugin.clearFilters();

          Ext.Array.forEach(result.filters, function (filter) {
            // Dates coming from the response have not been correctly formatted, the following statement fixes it to make it work correctly
            if (filter.type==="date") {
                if (filter.value.gt!==undefined) filter.value.gt=new Date(filter.value.gt);
                if (filter.value.lt!==undefined) filter.value.lt=new Date(filter.value.lt);
                if (filter.value.eq!==undefined) filter.value.eq=new Date(filter.value.eq);
            }
            
            // Adds each retreived filter
            plugin.addFilter([{
              dataIndex: filter.property,
              type: filter.type,
              operator: filter.operator,
              value: filter.value
            }]);
          });
        }

        // if a sorters property exists, it applies it to the grid
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

  /**
   * Saves the response, activates button 
   * @param {*} response 
   * @param {*} query 
   */
  updateResponse: function (response,query) {
    this.aiResponse=response;
    this.aiPrompt=query;
  }
});
