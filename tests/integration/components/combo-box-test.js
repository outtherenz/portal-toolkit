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
    set(this, 'option', '');
    set(this, 'setOption', option => {
      set(this, 'option', option);
    });
  }
});

test('it renders options', function(assert) {
  this.render(hbs`
    {{combo-box
      key='name'
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
      placeholder='Example Placeholder'
      key='name'
      value=value
      options=options
    }}
  `);

  assert.equal(this.$('.combo-box input').attr('placeholder'), 'Example Placeholder');
});

test('it renders a custom message when no options are found', function(assert) {
  this.render(hbs`
    {{combo-box
      key='name'
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
      key='name'
      value=value
      options=options
      emptyText='Nothing was found'
      emptyButtonText='Click me'
    }}
  `);

  this.$('.combo-box input').val('Next');
  this.$('.combo-box input').trigger('keydown');
  this.$('.combo-box input').change();

  assert.equal(this.$('.combo-box__drop-down__row--empty button').length, 0);
});

test('it renders a custom button when no options are found', function(assert) {
  this.render(hbs`
    {{combo-box
      key='name'
      value=value
      options=options
      emptyText='Nothing was found'
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
      key='name'
      value=value
      options=options
      emptyText='Nothing was found'
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
      key='name'
      value=value
      options=options
      emptyText='Nothing was found'
      emptyButtonText='Click me'
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
      key='name'
      value=value
      options=options
    }}
  `);

  this.$('.combo-box input').val('App');
  this.$('.combo-box input').trigger('keydown');
  this.$('.combo-box input').change();

  assert.equal(this.$('.combo-box__drop-down__row').length, 1);
  assert.equal(this.$('.combo-box__drop-down__row').text().trim(), 'Apple');
});

skip('it sets a value when an option is selected', function(assert) {
  this.render(hbs`
    {{combo-box
      key='name'
      value=option
      options=options
      onSet=setOption
    }}
  `);

  this.$('.combo-box input').trigger('keydown');
  this.$('.combo-box__drop-down__row').click();

  assert.equal(get(this, 'value'), 'Apple');
});

skip('it sets a value when a input is entered', function(assert) {
  this.render(hbs`
    {{combo-box
      key='name'
      value=option
      options=options
      onSet=setOption
    }}
  `);

  this.$('.combo-box input').val('Silicon Graphics');
  this.$('.combo-box input').trigger('keydown');
  this.$('.combo-box input').change();

  this.$().click();
  assert.equal(get(this, 'value'), 'Silicon Graphics');
});
