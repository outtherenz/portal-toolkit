import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

describeComponent('active-table', 'Integration: ActiveTableComponent', { integration: true }, function() {
  it('renders', function() {
    this.set('tableColumns', [{
      name: 'A',
      key: 'a'
    }, {
      name: 'B',
      key: 'b'
    }, {
      name: 'C',
      key: 'c'
    }]);

    this.set('sort', ['a:asc']);

    this.render(hbs`{{#active-table columns=tableColumns sortedBy=sort}}{{/active-table}}`);

    expect(this.$('table')).to.have.lengthOf(1, 'makes exactly one table');
  });
  it('has one heading sorted at a time and clicking an unsorted header sorts it', function() {
    this.set('tableColumns', [{
      name: 'A',
      key: 'a'
    }, {
      name: 'B',
      key: 'b'
    }, {
      name: 'C',
      key: 'c'
    }]);

    this.set('sort', ['a:asc']);

    this.render(hbs`{{#active-table columns=tableColumns sortedBy=sort}}{{/active-table}}`);

    expect(this.$('.sorted')).to.have.lengthOf(1, 'only one heading should have the sorted class');
    expect(this.$('th').not('.sorted')).to.have.lengthOf(2, 'two headings should not have the sorted class');
    const temp = this.$('.sorted');
    this.$('th:not(.sorted) a').click();
    expect(temp.hasClass('sorted')).to.equal(false, 'no longer has sorted class');
    expect(this.$('.sorted')).to.have.lengthOf(1, 'only one heading should have the sorted class');
    expect(this.$('th').not('.sorted')).to.have.lengthOf(2, 'two headings should not have the sorted class');
  });
  it('clicking a sorted heading inverses the sort order', function() {
    this.set('tableColumns', [{
      name: 'A',
      key: 'a'
    }, {
      name: 'B',
      key: 'b'
    }, {
      name: 'C',
      key: 'c'
    }]);

    this.set('sort', ['a:asc']);

    this.render(hbs`{{#active-table columns=tableColumns sortedBy=sort}}{{/active-table}}`);

    expect(this.$('.sorted')).to.have.lengthOf(1, 'checking initially only one heading has the sorted class');
    expect(this.$('.sorted.ascending')).to.have.lengthOf(1, 'checking initially only one heading has the sorted and ascending classes');

    this.$('.sorted a').click();
    return wait().then(() => {
      expect(this.$('.sorted.ascending')).to.have.lengthOf(0, 'after the click event, there should be no headings have class ascending');
      expect(this.$('.sorted')).to.have.lengthOf(1, 'after the click event, there should still only be one heading with the class sorted');
      expect(this.$('th').not('.sorted')).to.have.lengthOf(2, 'there are two unsorted collumns after the click');
    });
  });
  it('when given different widths of columns, resizes properly', function() {
    this.set('tableColumns', [{
      name: 'A',
      key: 'a',
      width: 1
    }, {
      name: 'B',
      key: 'b',
      width: 2
    }, {
      name: 'C',
      key: 'c',
      width: 3
    }]);

    this.set('sort', ['a:asc']);

    this.render(hbs`{{#active-table columns=tableColumns sortedBy=sort}}{{/active-table}}`);
    expect(this.$('.sorted').width()).to.be.equal(12, 'width of initially selected column');
    this.$('th:nth-child(2) a').click();
    return wait().then(() => {
      expect(this.$('.sorted').width()).to.be.equal(27, 'width of Newly selected coloumn');
      this.$('th:nth-child(3) a').click();
      return wait().then(() => {
        expect(this.$('.sorted').width()).to.be.equal(42, 'width of Newest selected coloumn');
      });
    });
  });
  it('takes different types of input for column width', function() {
    this.set('tableColumns', [{
      name: 'A',
      key: 'a',
      width: '300px'
    }, {
      name: 'B',
      key: 'b',
      width: 'auto'
    }, {
      name: 'C',
      key: 'c',
      width: 4
    }, {
      name: 'D',
      key: '61%'
    }]);

    this.set('sort', ['a:asc']);

    this.render(hbs`{{#active-table columns=tableColumns sortedBy=sort}}{{/active-table}}`);
    expect(this.$('.sorted').width()).to.be.equal(300, 'width of 1 selected column');
    expect(this.$('th:nth-child(2)').width()).to.be.equal(12, 'width of 2 selected coloumn');
    expect(this.$('th:nth-child(3)').width()).to.be.equal(12, 'width of 3 selected coloumn');
    expect(this.$('th:nth-child(4)').width()).to.be.equal(108, 'width of 4 selected coloumn');
  });
});
