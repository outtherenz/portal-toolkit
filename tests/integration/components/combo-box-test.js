import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { get, set } from '@ember/object';
import { next } from '@ember/runloop';

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
      }, 0);
    });
    set(this, 'option', '');
    set(this, 'setOption', option => {
      set(this, 'option', option);
    });
  }
});

test('it renders options on keydown', function(assert) {
  this.render(hbs`
    {{combo-box
      key='name'
      value=value
      options=options
    }}
  `);

  this.$('.combo-box input').trigger('keydown');
  assert.equal(
    this.$('[data-test-combo-box-option]').length,
    3,
    'Three options are found'
  );
});

test('it renders options on click', function(assert) {
  this.render(hbs`
    {{combo-box
      key='name'
      value=value
      options=options
    }}
  `);

  this.$('.combo-box input').trigger('click');
  assert.equal(
    this.$('[data-test-combo-box-option]').length,
    3,
    'Three options are found'
  );
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

  assert.equal(this.$('.combo-box input').attr('placeholder'), 'Example Placeholder', 'A placeholder is displayed');
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

  assert.equal(
    this.$('.combo-box__drop-down__row--empty').text().trim(),
    'Nothing was found',
    'Custom message is found'
  );
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

  assert.equal(
    this.$('.combo-box__drop-down__row--empty button').length,
    0,
    'Has not rendered a custom button'
  );
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

  assert.equal(
    this.$('.combo-box__drop-down__row--empty button').length,
    1,
    'Custom button was found'
  );
  assert.equal(
    this.$('.combo-box__drop-down__row--empty button').text().trim(),
    'Click me',
    'Button text is correct'
  );
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

  assert.equal(
    this.$('.combo-box__drop-down__row--loading').length,
    1,
    'Loading icon was found'
  );
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

  assert.equal(
    this.$('[data-test-combo-box-option]').length,
    1,
    'Corect number of rows are found before loading content'
  );

  assert.timeout(300);
  const done = assert.async();

  setTimeout(() => {
    // this component does not update even though get(this, 'newOptions') returns correctly
    assert.equal(
      this.$('[data-test-combo-box-option]').length,
      2,
      'Correct number of rows are fount after loading content'
    );
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

  this.$('.combo-box input').trigger('click');

  assert.equal(
    this.$('[data-test-combo-box-option]').length,
    3,
    'Correct number of options are found before entering text'
  );

  this.$('.combo-box input').val('App');
  this.$('.combo-box input').change();

  assert.equal(
    this.$('[data-test-combo-box-option]').length,
    1,
    'Correct number of options were found after entering text'
  );
  assert.equal(
    this.$('[data-test-combo-box-option]').text().trim(),
    'Apple',
    'Content of the remaining option is correct'
  );
});

test('it sets a value when an option is selected', function(assert) {
  this.render(hbs`
    {{combo-box
      key='name'
      value=option
      options=options
      onSet=setOption
    }}
  `);

  this.$('.combo-box input').trigger('keydown');
  this.$('[data-test-combo-box-option="0"]').click();

  next(() => {
    assert.equal(
      get(this, 'option'),
      'Apple',
      'Selection has been set'
    );
  });
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
