# KRIT UI

Библиотека UI компонентов для [KRIT](https://krit.global/)

## Совместимость

Библиотека поддерживает React и React DOM версий 18 и 19. React должен быть установлен в приложении-потребителе.

## Использование библиотеки

`<ThemeProvider>` обязательна для корректного отображения компонентов UI.

`<ThemeProvider>` принимает свойство `translations` через которое можно передать переводы.

### Пример

```jsx
<ThemeProvider translations={
  {
    confirmAction: 'Подтвердите действие',
    cancelAction: 'Отменить действие',
    ...
  }
}>
    <App />
</ThemeProvider>
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
