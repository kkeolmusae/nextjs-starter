# Error Hanlding Guide
## 1. Debug Attach 설정으로 인한 버그
- 상황: 초기 세팅후 `npm run dev` 로 서버 켜자마자 에러 발생 (별다른 세팅 x)
- 원인: Debug Attach 가 smart 인가 뭔가로 켜져있었음.
- 해결: Debug Attach 가 켜져있으면 에러 발생 => 끔 (FYI, https://github.com/microsoft/vscode-js-debug/issues/374#issuecomment-622239998)