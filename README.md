# KRIT UI

Библиотека UI компонентов для [KRIT](https://krit.global/)

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

## Публикация пакета

Пакет публикуется в npm как `@chrome-consulting/krit-ui`.

Перед публикацией убедитесь, что в `package.json` и `package-lock.json` указаны:

```json
{
  "name": "@chrome-consulting/krit-ui",
  "version": "x.y.z"
}
```

В `package.json` не должно быть `"private": true`.

### Подготовка PR

1. Создайте ветку от актуального `main`.
2. Внесите изменения в исходники `lib/`.
3. Поднимите версию пакета.
4. Проверьте пакет локально:

```bash
npm ci
npm run build
npm run lint
npm pack --dry-run
```

5. Откройте PR в `krit-ui`.

### Публикация после merge

Публиковать нужно из актуального `main`, после merge PR:

```bash
git checkout main
git pull
npm ci
npm run build
npm pack --dry-run
npm publish --access public
```

Проверьте опубликованную версию:

```bash
npm view @chrome-consulting/krit-ui version
```

Если `npm whoami` возвращает `ENEEDAUTH`, выполните логин:

```bash
npm login --scope=@chrome-consulting --registry=https://registry.npmjs.org/
```

Если браузерный логин не работает:

```bash
npm login --auth-type=legacy --scope=@chrome-consulting --registry=https://registry.npmjs.org/
```

Если `npm publish` возвращает `403`, у аккаунта нет прав на пакет или scope `@chrome-consulting`.

### Обновление TORO web

После публикации новой версии обновите зависимость в TORO `web`:

```bash
cd ../web
npm install @chrome-consulting/krit-ui@x.y.z
npm run typecheck
```

Если до публикации использовался временный `patch-package`, удалите patch после установки опубликованной версии:

```bash
rm patches/@chrome-consulting+krit-ui+*.patch
```

Если patch был единственным, также можно убрать `postinstall: patch-package` из `web/package.json`.

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
