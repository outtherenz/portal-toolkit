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

module('Integration | Component | search select', function(hooks) {
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
      }, 100);
    });
    set(this, 'option', '');
    set(this, 'setOption', option => {
      set(this, 'option', option);
    });
  });

  test('it renders options', async function(assert) {
    await render(hbs`
      {{search-select
        keys='name'
        value=value
        options=options
      }}
    `);

    await triggerEvent('.search-select input', 'keydown');
    assert.dom('.search-select__drop-down__row').exists({ count: 3 }, 'Correct number of options were found');
  });

  test('it renders placeholder', async function(assert) {
    await render(hbs`
      {{search-select
        placeholder='Example Placeholder'
        keys='name'
        value=value
        options=options
      }}
    `);

    assert.dom('.search-select input').hasAttribute('placeholder', 'Example Placeholder', 'Correct placeholder was found');
  });

  test('it renders the multiple keys', async function(assert) {
    await render(hbs`
      {{search-select
        placeholder='Example Placeholder'
        keys='code,name'
        value=value
        options=options
      }}
    `);

    await triggerEvent('.search-select input', 'keydown');
    findAll('.search-select__drop-down__row').forEach((row, i) => {
      const option = get(this, `options.${i}`);
      const matchString = `${get(option, 'code')} - ${get(option, 'name')}`;
      assert.equal(
        this.$(row).text().trim(),
        matchString,
        `Option ${i} has the displays the correct string`
      );
    });
  });

  test('it renders a custom separator', async function(assert) {
    await render(hbs`
      {{search-select
        separator='_'
        placeholder='Example Placeholder'
        keys='name,code'
        value=value
        options=options
      }}
    `);

    await triggerEvent('.search-select input', 'keydown');
    findAll('.search-select__drop-down__row').forEach((row, i) => {
      const option = get(this, `options.${i}`);
      const matchString = `${get(option, 'name')}_${get(option, 'code')}`;
      assert.equal(
        this.$(row).text().trim(),
        matchString,
        `Option ${i} has the correct string`
      );
    });
  });

  test('it renders a message when no options are found', async function(assert) {
    await render(hbs`
      {{search-select
        keys='name,code'
        value=value
        options=options
      }}
    `);

    await fillIn('.search-select input', 'Next');
    await triggerEvent('.search-select input', 'keydown');
    await triggerEvent('.search-select input', 'change');

    assert.dom('.search-select__drop-down__row--empty').hasText('No items found', 'Not items message found');
  });

  test('it renders a custom message when no options are found', async function(assert) {
    await render(hbs`
      {{search-select
        keys='name'
        value=value
        options=options
        emptyText='Nothing was found'
      }}
    `);

    await fillIn('.search-select input', 'Next');
    await triggerEvent('.search-select input', 'keydown');
    await triggerEvent('.search-select input', 'change');

    assert.dom('.search-select__drop-down__row--empty').hasText('Nothing was found', 'Custom no items message found');
  });

  test('it does not render a custom button when you do not provide an action for the button', async function(assert) {
    await render(hbs`
      {{search-select
        keys='name'
        value=value
        options=options
        emptyText='Nothing was found'
        emptyButtonText='Click me'
      }}
    `);

    await fillIn('.search-select input', 'Next');
    await triggerEvent('.search-select input', 'keydown');
    await triggerEvent('.search-select input', 'change');

    assert.dom('.search-select__drop-down__row--empty button').doesNotExist('No items button found');
  });

  test('it renders a custom button when no options are found', async function(assert) {
    await render(hbs`
      {{search-select
        keys='name'
        value=value
        options=options
        emptyText='Nothing was found'
        emptyButtonText='Click me'
        emptyButtonAction=getItems
      }}
    `);

    await fillIn('.search-select input', 'Next');
    await triggerEvent('.search-select input', 'keydown');
    await triggerEvent('.search-select input', 'change');

    assert.dom('.search-select__drop-down__row--empty button').hasText('Click me', 'Custom no items button text found');
  });

  test('it enters loading state correctly', async function(assert) {
    await render(hbs`
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

    await fillIn('.search-select input', 'Next');
    await triggerEvent('.search-select input', 'keydown');
    await triggerEvent('.search-select input', 'change');
    await click('.search-select__drop-down__row--empty button');

    assert.dom('.search-select__drop-down__row--loading').exists({ count: 1 }, 'Loading icon found');
  });

  skip('it loads new options correctly', async function(assert) {
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

    await fillIn('.search-select input', 'Next');
    await triggerEvent('.search-select input', 'keydown');
    await triggerEvent('.search-select input', 'change');
    await click('.search-select__drop-down__row--empty button');

    assert.timeout(300);
    const done = assert.async();

    setTimeout(() => {
      // this component does not update even though get(this, 'newOptions') returns correctly
      assert.dom('.search-select__drop-down__row').exists({ count: 2 });
      done();
    }, 200);
  });

  test('it filters options', async function(assert) {
    await render(hbs`
      {{search-select
        keys='name'
        value=value
        options=options
      }}
    `);

    await fillIn('.search-select input', 'App');
    await triggerEvent('.search-select input', 'keydown');
    await triggerEvent('.search-select input', 'change');

    assert.dom('.search-select__drop-down__row').exists({ count: 1 }, 'Correct number of options remain');
    assert.dom('.search-select__drop-down__row').hasText('Apple', 'Remaining option has correct text');
  });

  skip('it sets a value when an option is selected', async function(assert) {
    this.render(hbs`
      {{search-select
        keys='name'
        value=option
        options=options
        onSet=setOption
      }}
    `);

    await triggerEvent('.search-select input', 'keydown');
    await click('.search-select__drop-down__row');

    assert.equal(
      this.value,
      'Apple',
      'Correct value has been set'
    );
  });

  skip('it sets a value when a input is entered', async function(assert) {
    this.render(hbs`
      {{search-select
        keys='name'
        value=option
        options=options
        onSet=setOption
      }}
    `);

    await fillIn('.search-select input', 'Silicon Graphics');
    await triggerEvent('.search-select input', 'keydown');
    await triggerEvent('.search-select input', 'change');

    await click();
    assert.equal(
      this.value,
      'Silicon Graphics',
      'Correct value has been set'
    );
  });

  test('it does not set input value when search only', async function(assert) {
    await render(hbs`
      {{search-select
        keys='name'
        value=option
        options=options
        onSet=setOption
      }}
    `);

    await fillIn('.search-select input', 'Silicon Graphics');
    await triggerEvent('.search-select input', 'keydown');
    await triggerEvent('.search-select input', 'change');

    assert.equal(
      this.value,
      '',
      'No input value was set'
    );
  });
});
