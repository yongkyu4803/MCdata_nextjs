# shadcn/ui 설정 가이드

이 프로젝트에 shadcn/ui가 성공적으로 설정되었습니다.

## 설치된 컴포넌트

- ✅ Button
- ✅ Card (with Header, Title, Description, Content, Footer)

## 더 많은 컴포넌트 추가하기

shadcn/ui는 공식 CLI를 제공하지만, 수동으로 컴포넌트를 추가할 수도 있습니다.

### 방법 1: 공식 웹사이트에서 복사

1. [shadcn/ui 컴포넌트](https://ui.shadcn.com/docs/components) 방문
2. 원하는 컴포넌트 선택
3. 코드 복사하여 `src/components/ui/` 폴더에 저장
4. 필요한 의존성 설치 (컴포넌트 문서에 명시됨)

### 방법 2: npx 명령어 사용

```bash
npx shadcn@latest add [component-name]
```

예시:
```bash
npx shadcn@latest add input
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

## 설치된 의존성

```json
{
  "dependencies": {
    "@radix-ui/react-slot": "^1.2.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.545.0",
    "tailwind-merge": "^3.3.1"
  },
  "devDependencies": {
    "tailwindcss-animate": "^1.0.7"
  }
}
```

## 컴포넌트 사용 예시

### Button

```tsx
import { Button } from '@/components/ui/button';

<Button>Click me</Button>
<Button variant="outline">Outline</Button>
<Button variant="destructive">Delete</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Card

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

## 자주 사용되는 컴포넌트 추가 명령어

```bash
# Form 관련
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add select
npx shadcn@latest add checkbox
npx shadcn@latest add radio-group
npx shadcn@latest add switch
npx shadcn@latest add label

# 레이아웃
npx shadcn@latest add dialog
npx shadcn@latest add sheet
npx shadcn@latest add tabs
npx shadcn@latest add accordion

# 피드백
npx shadcn@latest add alert
npx shadcn@latest add toast
npx shadcn@latest add progress

# 네비게이션
npx shadcn@latest add dropdown-menu
npx shadcn@latest add navigation-menu
npx shadcn@latest add menubar
```

## 다크 모드 설정

다크 모드가 이미 설정되어 있습니다. Tailwind CSS의 `dark:` 클래스를 사용하면 됩니다.

```tsx
// 프로그래밍 방식으로 다크 모드 토글하려면 next-themes 설치
npm install next-themes
```

## 추가 리소스

- [shadcn/ui 공식 문서](https://ui.shadcn.com)
- [Radix UI 문서](https://www.radix-ui.com)
- [Tailwind CSS 문서](https://tailwindcss.com)
