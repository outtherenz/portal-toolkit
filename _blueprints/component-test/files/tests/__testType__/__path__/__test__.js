import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
<% if (testType === 'integration') { %>import hbs from 'htmlbars-inline-precompile';
<% } %>
describeComponent('<%= dasherizedModuleName %>', '<% if (testType === "integration") { %>Integration: <% } %><%= classifiedModuleName %>Component', { <% if (testType === 'integration' ) { %>integration: true<% } else if(testType === 'unit') { %>unit: true<% } %> }, function() {
  it('renders', function() {
    <% if (testType === 'integration' ) { %>// Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#<%= dasherizedModuleName %>}}
    //     template content
    //   {{/<%= dasherizedModuleName %>}}
    // `);

    this.render(hbs`{{<%= dasherizedModuleName %>}}`);
    expect(this.$()).to.have.lengthOf(1);<% } else if(testType === 'unit') { %>// Creates the component instance
    const component = this.subject();

    // Renders the component on the page
    this.render();
    expect(component).to.be.ok;
    expect(this.$()).to.have.length(1);<% } %>
  });
});
