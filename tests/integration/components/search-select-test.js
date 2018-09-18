import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { get, set } from '@ember/object';

moduleForComponent('search-select', 'Integration | Component | search select', {
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
    set(this, 'option', '');
    set(this, 'setOption', option => {
      set(this, 'option', option);
    });
  }
});

test('it renders options', function(assert) {
  this.render(hbs`
    {{search-select
      keys='name'
      value=value
      options=options
    }}
  `);

  this.$('.search-select input').trigger('keydown');
  assert.equal(this.$('.search-select__drop-down__row').length, 3);
});

test('it renders placeholder', function(assert) {
  this.render(hbs`
    {{search-select
      placeholder='Example Placeholder'
      keys='name'
      value=value
      options=options
    }}
  `);

  assert.equal(this.$('.search-select input').attr('placeholder'), 'Example Placeholder');
});

test('it renders the multiple keys', function(assert) {
  this.render(hbs`
    {{search-select
      placeholder='Example Placeholder'
      keys='code,name'
      value=value
      options=options
    }}
  `);

  this.$('.search-select input').trigger('keydown');
  this.$('.search-select__drop-down__row').each((i, row) => {
    const option = get(this, `options.${i}`);
    const matchString = `${get(option, 'code')} - ${get(option, 'name')}`;
    assert.equal(this.$(row).text().trim(), matchString);
  });
});

test('it renders a custom separator', function(assert) {
  this.render(hbs`
    {{search-select
      separator='_'
      placeholder='Example Placeholder'
      keys='name,code'
      value=value
      options=options
    }}
  `);

  this.$('.search-select input').trigger('keydown');
  this.$('.search-select__drop-down__row').each((i, row) => {
    const option = get(this, `options.${i}`);
    const matchString = `${get(option, 'name')}_${get(option, 'code')}`;
    assert.equal(this.$(row).text().trim(), matchString);
  });
});

test('it renders a message when no options are found', function(assert) {
  this.render(hbs`
    {{search-select
      keys='name,code'
      value=value
      options=options
    }}
  `);

  this.$('.search-select input').val('Next');
  this.$('.search-select input').trigger('keydown');
  this.$('.search-select input').change();

  assert.equal(this.$('.search-select__drop-down__row--empty').text().trim(), 'No items found');
});

test('it renders a custom message when no options are found', function(assert) {
  this.render(hbs`
    {{search-select
      keys='name'
      value=value
      options=options
      emptyText='Nothing was found'
    }}
  `);

  this.$('.search-select input').val('Next');
  this.$('.search-select input').trigger('keydown');
  this.$('.search-select input').change();

  assert.equal(this.$('.search-select__drop-down__row--empty').text().trim(), 'Nothing was found');
});

test('it does not render a custom button when you do not provide an action for the button', function(assert) {
  this.render(hbs`
    {{search-select
      keys='name'
      value=value
      options=options
      emptyText='Nothing was found'
      emptyButtonText='Click me'
    }}
  `);

  this.$('.search-select input').val('Next');
  this.$('.search-select input').trigger('keydown');
  this.$('.search-select input').change();

  assert.equal(this.$('.search-select__drop-down__row--empty button').length, 0);
});

test('it renders a custom button when no options are found', function(assert) {
  this.render(hbs`
    {{search-select
      keys='name'
      value=value
      options=options
      emptyText='Nothing was found'
      emptyButtonText='Click me'
      emptyButtonAction=getItems
    }}
  `);

  this.$('.search-select input').val('Next');
  this.$('.search-select input').trigger('keydown');
  this.$('.search-select input').change();

  assert.equal(this.$('.search-select__drop-down__row--empty button').length, 1);
});

test('it enters loading state correctly', function(assert) {
  this.render(hbs`
    {{search-select
      keys='name'
      value=value
      options=options
      emptyText='Nothing was found'
      emptyButtonText='Click me'
      emptyButtonAction=getItems
      isLoading=isLoading
    }}
  `);

  this.$('.search-select input').val('Next');
  this.$('.search-select input').trigger('keydown');
  this.$('.search-select input').change();
  this.$('.search-select__drop-down__row--empty button').click();

  assert.equal(this.$('.search-select__drop-down__row--loading').length, 1);
});

skip('it loads new options correctly', function(assert) {
  this.render(hbs`
    {{search-select
      keys='name'
      value=value
      options=options
      emptyText='Nothing was found'
      emptyButtonText='Click me'
      emptyButtonAction=getItems
      isLoading=isLoading
    }}
  `);

  this.$('.search-select input').val('Next');
  this.$('.search-select input').trigger('keydown');
  this.$('.search-select input').change();
  this.$('.search-select__drop-down__row--empty button').click();

  assert.timeout(300);
  const done = assert.async();

  setTimeout(() => {
    // this component does not update even though get(this, 'newOptions') returns correctly
    assert.equal(this.$('.search-select__drop-down__row').length, 2);
    done();
  }, 200);
});

test('it filters options', function(assert) {
  this.render(hbs`
    {{search-select
      keys='name'
      value=value
      options=options
    }}
  `);

  this.$('.search-select input').val('App');
  this.$('.search-select input').trigger('keydown');
  this.$('.search-select input').change();

  assert.equal(this.$('.search-select__drop-down__row').length, 1);
  assert.equal(this.$('.search-select__drop-down__row').text().trim(), 'Apple');
});

skip('it sets a value when an option is selected', function(assert) {
  this.render(hbs`
    {{search-select
      keys='name'
      value=option
      options=options
      onSet=setOption
    }}
  `);

  this.$('.search-select input').trigger('keydown');
  this.$('.search-select__drop-down__row').click();

  assert.equal(get(this, 'value'), 'Apple');
});

skip('it sets a value when a input is entered', function(assert) {
  this.render(hbs`
    {{search-select
      keys='name'
      value=option
      options=options
      onSet=setOption
    }}
  `);

  this.$('.search-select input').val('Silicon Graphics');
  this.$('.search-select input').trigger('keydown');
  this.$('.search-select input').change();

  this.$().click();
  assert.equal(get(this, 'value'), 'Silicon Graphics');
});

test('it does not set input value when search only', function(assert) {
  this.render(hbs`
    {{search-select
      keys='name'
      value=option
      options=options
      onSet=setOption
    }}
  `);

  this.$('.search-select input').val('Silicon Graphics');
  this.$('.search-select input').trigger('keydown');
  this.$('.search-select input').change();

  assert.equal(get(this, 'value'), '');
});
