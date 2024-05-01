## Module Report
### Unknown Global

**Global**: `Ember.testing`

**Location**: `addon/services/notifications.js` at line 71

```js
    It should be reviseted at a later date.
    */
    if (Ember.testing) return;

    later(() => {
```

### Unknown Global

**Global**: `Ember.testing`

**Location**: `addon/components/file-inputs/text.js` at line 15

```js
    It should be reviseted at a later date.
    */
    const files = get(event, Ember.testing ? 'testFiles' : 'target.files');
    const reader = new FileReader();

```

### Unknown Global

**Global**: `Ember.testing`

**Location**: `addon/components/file-inputs/csv.js` at line 33

```js

    reader.readAsText(files[0]);
    if (!Ember.testing) {
      event.target.value = '';
    }
```
