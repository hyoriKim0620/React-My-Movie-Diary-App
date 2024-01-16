Demo : https://react-my-movie-diary-88e7713vh-hyoris-projects.vercel.app/

"나의 영화 다이어리 - My Movie Diary" Application입니다.

* 아직 완성되지 않았으며 주기적으로 기능 및 UI 수정중에 있습니다.
* 추후 추가 기능 : 로그인, 회원가입, 리뷰 등록 시 영화 장르에 대한 태그 추가 기능

모바일 어플리케이션에 최적화 되어있기 때문에 모바일 기기 사이즈로 보시는 걸 추천드립니다!
ex) iPhone12, iPhone12 Pro, iPhoneXR 등등






# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
