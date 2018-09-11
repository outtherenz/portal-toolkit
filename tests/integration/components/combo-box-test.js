import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { get, set } from '@ember/object';

moduleForComponent('combo-box', 'Integration | Component | combo box', {
  integration: true,

  beforeEach() {
    set(this, 'options', [{
      name: 'Apple',
      code: '0'
    }, {
      name: 'IBM',
      code: '1'
    }, {
      name: 'Dell',
      code: '2'
    }]);
    set(this, 'value', '');
    set(this, 'relationship', {});
    set(this, 'newOptions', []);
    set(this, 'getItems', () => {
      set(this, 'isLoading', true);
      setTimeout(() => {
        set(this, 'newOptions', [{ name: 'Google', code: '0' }, { name: 'Microsoft', code: '1' }]);
        set(this, 'isLoading', false);
      }, 100);
    });
  }
});

test('it renders options', function(assert) {
  this.render(hbs`
    {{combo-box
      searchKeys='code,name'
      value=value
      options=options
    }}
  `);

  this.$('.combo-box input').trigger('keydown');
  assert.equal(this.$('.combo-box__drop-down__row').length, 3);
});

test('it renders placeholder', function(assert) {
  this.render(hbs`
    {{combo-box
      searchKeys='code,name'
      placeholder='Example Placeholder'
      value=value
      options=options
    }}
  `);

  assert.equal(this.$('.combo-box input').attr('placeholder'), 'Example Placeholder');
});

test('it renders the display string', function(assert) {
  this.render(hbs`
    {{combo-box
      searchKeys='code,name'
      placeholder='Example Placeholder'
      value=value
      options=options
    }}
  `);

  this.$('.combo-box input').trigger('keydown');
  this.$('.combo-box__drop-down__row').each((i, row) => {
    const option = get(this, `options.${i}`);
    const matchString = `${get(option, 'code')} - ${get(option, 'name')}`;
    assert.equal(this.$(row).text().trim(), matchString);
  });
});

test('it renders a custom separator', function(assert) {
  this.render(hbs`
    {{combo-box
      searchKeys='name,code'
      separator='_'
      value=value
      options=options
    }}
  `);

  this.$('.combo-box input').trigger('keydown');
  this.$('.combo-box__drop-down__row').each((i, row) => {
    const option = get(this, `options.${i}`);
    const matchString = `${get(option, 'name')}_${get(option, 'code')}`;
    assert.equal(this.$(row).text().trim(), matchString);
  });
});

test('it renders a message when no options are found and search only is true', function(assert) {
  this.render(hbs`
    {{combo-box
      searchOnly=true
      searchKeys='name,code'
      value=value
      options=options
    }}
  `);

  this.$('.combo-box input').val('Next');
  this.$('.combo-box input').trigger('keydown');
  this.$('.combo-box input').change();

  assert.equal(this.$('.combo-box__drop-down__row--empty').text().trim(), 'No items found');
});

test('it renders a custom message when no options are found and search only is true', function(assert) {
  this.render(hbs`
    {{combo-box
      searchOnly=true
      searchKeys='name,code'
      value=value
      options=options
      emptyText='Nothing was found'
    }}
  `);

  this.$('.combo-box input').val('Next');
  this.$('.combo-box input').trigger('keydown');
  this.$('.combo-box input').change();

  assert.equal(this.$('.combo-box__drop-down__row--empty').text().trim(), 'Nothing was found');
});

test('it does not render a custom button when you do not provide an action for the button', function(assert) {
  this.render(hbs`
    {{combo-box
      searchOnly=true
      searchKeys='name,code'
      value=value
      options=options
      emptyText='Check out this button'
      emptyButtonText='Click me'
    }}
  `);

  this.$('.combo-box input').val('Next');
  this.$('.combo-box input').trigger('keydown');
  this.$('.combo-box input').change();

  assert.equal(this.$('.combo-box__drop-down__row--empty button').length, 0);
});

test('it renders a custom button when no options are found and search only is true', function(assert) {
  this.render(hbs`
    {{combo-box
      searchOnly=true
      searchKeys='name,code'
      value=value
      options=options
      emptyText='Check out this button'
      emptyButtonText='Click me'
      emptyButtonAction=getItems
    }}
  `);

  this.$('.combo-box input').val('Next');
  this.$('.combo-box input').trigger('keydown');
  this.$('.combo-box input').change();

  assert.equal(this.$('.combo-box__drop-down__row--empty button').length, 1);
});

test('it enters loading state correctly', function(assert) {
  this.render(hbs`
    {{combo-box
      searchOnly=true
      searchKeys='name,code'
      value=value
      options=options
      emptyText='Check out this button'
      emptyButtonText='Click me'
      emptyButtonAction=getItems
      isLoading=isLoading
    }}
  `);

  this.$('.combo-box input').val('Next');
  this.$('.combo-box input').trigger('keydown');
  this.$('.combo-box input').change();
  this.$('.combo-box__drop-down__row--empty button').click();

  assert.equal(this.$('.combo-box__drop-down__row--loading').length, 1);
});

skip('it loads new options correctly', function(assert) {
  this.render(hbs`
    {{combo-box
      searchOnly=true
      searchKeys='name,code'
      value=value
      options=newOptions
      emptyButtonAction=getItems
      isLoading=isLoading
    }}
  `);

  this.$('.combo-box input').val('Next');
  this.$('.combo-box input').trigger('keydown');
  this.$('.combo-box input').change();
  this.$('.combo-box__drop-down__row--empty button').click();

  assert.timeout(300);
  const done = assert.async();

  setTimeout(() => {
    // this component does not update even though get(this, 'newOptions') returns correctly
    assert.equal(this.$('.combo-box__drop-down__row').length, 2);
    done();
  }, 200);
});

test('it filters options', function(assert) {
  this.render(hbs`
    {{combo-box
      searchKeys='code,name'
      value=value
      options=options
    }}
  `);

  this.$('.combo-box input').val('App');
  this.$('.combo-box input').trigger('keydown');
  this.$('.combo-box input').change();

  assert.equal(this.$('.combo-box__drop-down__row').length, 1);
  assert.equal(this.$('.combo-box__drop-down__row').text().trim(), '0 - Apple');
});

test('it sets a value when an option is selected', function(assert) {
  this.render(hbs`
    {{combo-box
      searchKeys='code,name'
      value=value
      options=options
    }}
  `);

  this.$('.combo-box input').trigger('keydown');
  this.$('.combo-box__drop-down__row').click();

  assert.equal(get(this, 'value'), 'Apple');
});

test('it sets an object when an option is selected and search only is true', function(assert) {
  this.render(hbs`
    {{combo-box
      searchOnly=true
      searchKeys='code,name'
      value=relationship
      options=options
    }}
  `);

  this.$('.combo-box input').trigger('keydown');
  this.$('.combo-box__drop-down__row').click();

  assert.equal(JSON.stringify(get(this, 'relationship')), JSON.stringify({
    name: 'Apple',
    code: '0',
    displayName: '0 - Apple'
  }));
});

test('it sets a value when a input is entered', function(assert) {
  this.render(hbs`
    {{combo-box
      searchKeys='code,name'
      value=value
      options=options
    }}
  `);

  this.$('.combo-box input').val('Silicon Graphics');
  this.$('.combo-box input').trigger('keydown');
  this.$('.combo-box input').change();

  this.$().click();
  assert.equal(get(this, 'value'), 'Silicon Graphics');
});

test('it renders when search only', function(assert) {
  this.render(hbs`
    {{combo-box
      searchOnly=true
      searchKeys='code,name'
      value=value
      options=options
    }}
  `);

  this.$('.combo-box input').trigger('keydown');

  assert.equal(this.$('.combo-box__search-icon').length, 1);
});

test('it does not set input value when search only', function(assert) {
  this.render(hbs`
    {{combo-box
      searchOnly=true
      searchKeys='code,name'
      value=value
      options=options
    }}
  `);

  this.$('.combo-box input').val('Silicon Graphics');
  this.$('.combo-box input').trigger('keydown');
  this.$('.combo-box input').change();

  assert.equal(get(this, 'value'), '');
});
