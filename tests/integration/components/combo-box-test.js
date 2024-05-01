import { module, skip, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import {
  render,
  find,
  click,
  findAll,
  fillIn,
  triggerEvent
} from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { get, set } from '@ember/object';
import { next } from '@ember/runloop';

module('Integration | Component | combo box', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
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
  });

  test('it renders options on keydown', async function(assert) {
    await render(hbs`
      {{combo-box
        key='name'
        value=value
        options=options
      }}
    `);

    await triggerEvent('.combo-box input', 'keydown');
    assert.dom('[data-test-combo-box-option]').exists({ count: 3 }, 'Three options are found');
  });

  test('it renders options on click', async function(assert) {
    await render(hbs`
      {{combo-box
        key='name'
        value=value
        options=options
      }}
    `);

    await click('.combo-box input');
    assert.dom('[data-test-combo-box-option]').exists({ count: 3 }, 'Three options are found');
  });

  test('it renders placeholder', async function(assert) {
    await render(hbs`
      {{combo-box
        placeholder='Example Placeholder'
        key='name'
        value=value
        options=options
      }}
    `);

    assert.dom('.combo-box input').hasAttribute('placeholder', 'Example Placeholder', 'A placeholder is displayed');
  });

  test('it renders a custom message when no options are found', async function(assert) {
    await render(hbs`
      {{combo-box
        key='name'
        value=value
        options=options
        emptyText='Nothing was found'
      }}
    `);

    await fillIn('.combo-box input', 'Next');
    await triggerEvent('.combo-box input', 'keydown');
    await triggerEvent('.combo-box input', 'change');

    assert.dom('.combo-box__drop-down-row--empty').hasText('Nothing was found', 'Custom message is found');
  });

  test('it does not render a custom button when you do not provide an action for the button', async function(assert) {
    await render(hbs`
      {{combo-box
        key='name'
        value=value
        options=options
        emptyText='Nothing was found'
        emptyButtonText='Click me'
      }}
    `);

    await fillIn('.combo-box input', 'Next');
    await triggerEvent('.combo-box input', 'keydown');
    await triggerEvent('.combo-box input', 'change');

    assert.dom('.combo-box__drop-down-row--empty button').doesNotExist('Has not rendered a custom button');
  });

  test('it renders a custom button when no options are found', async function(assert) {
    await render(hbs`
      {{combo-box
        key='name'
        value=value
        options=options
        emptyText='Nothing was found'
        emptyButtonText='Click me'
        emptyButtonAction=getItems
      }}
    `);

    await fillIn('.combo-box input', 'Next');
    await triggerEvent('.combo-box input', 'keydown');
    await triggerEvent('.combo-box input', 'change');

    assert.dom('.combo-box__drop-down-row--empty button').exists({ count: 1 }, 'Custom button was found');
    assert.dom('.combo-box__drop-down-row--empty button').hasText('Click me', 'Button text is correct');
  });

  test('it enters loading state correctly', async function(assert) {
    await render(hbs`
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

    await fillIn('.combo-box input', 'Next');
    await triggerEvent('.combo-box input', 'keydown');
    await triggerEvent('.combo-box input', 'change');
    await click('.combo-box__drop-down-row--empty button');

    assert.dom('.combo-box__drop-down-row--loading').exists({ count: 1 }, 'Loading icon was found');
  });

  skip('it loads new options correctly', async function(assert) {
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

    await fillIn('.combo-box input', 'Next');
    await triggerEvent('.combo-box input', 'keydown');
    await triggerEvent('.combo-box input', 'change');
    await click('.combo-box__drop-down-row--empty button');

    assert.dom('[data-test-combo-box-option]').exists({ count: 1 }, 'Corect number of rows are found before loading content');

    assert.timeout(300);
    const done = assert.async();

    setTimeout(() => {
      // this component does not update even though get(this, 'newOptions') returns correctly
      assert.dom('[data-test-combo-box-option]').exists({ count: 2 }, 'Correct number of rows are fount after loading content');
      done();
    }, 200);
  });

  test('it filters options', async function(assert) {
    await render(hbs`
      {{combo-box
        key='name'
        value=value
        options=options
      }}
    `);

    await click('.combo-box input');

    assert.dom('[data-test-combo-box-option]').exists({ count: 3 }, 'Correct number of options are found before entering text');

    await fillIn('.combo-box input', 'App');
    await triggerEvent('.combo-box input', 'change');

    assert.dom('[data-test-combo-box-option]').exists({ count: 1 }, 'Correct number of options were found after entering text');
    assert.dom('[data-test-combo-box-option]').hasText('Apple', 'Content of the remaining option is correct');
  });

  test('it sets a value when an option is selected', async function(assert) {
    await render(hbs`
      {{combo-box
        key='name'
        value=option
        options=options
        onSet=setOption
      }}
    `);

    await triggerEvent('.combo-box input', 'keydown');
    await click('[data-test-combo-box-option="0"]');

    next(() => {
      assert.equal(
        this.option,
        'Apple',
        'Selection has been set'
      );
    });
  });

  skip('it sets a value when a input is entered', async function(assert) {
    this.render(hbs`
      {{combo-box
        key='name'
        value=option
        options=options
        onSet=setOption
      }}
    `);

    await fillIn('.combo-box input', 'Silicon Graphics');
    await triggerEvent('.combo-box input', 'keydown');
    await triggerEvent('.combo-box input', 'change');

    await click();
    assert.equal(this.value, 'Silicon Graphics');
  });
});
