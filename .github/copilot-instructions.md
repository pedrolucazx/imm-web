# Chakra UI v3 Development Rules

This project uses **Chakra UI v3**. Follow these rules when generating code:

## Import Rules

### From @chakra-ui/react:

- Alert, Avatar, Button, Card, Field, Table, Input, NativeSelect, Tabs, Textarea
- Separator, useDisclosure, Box, Flex, Stack, HStack, VStack, Text, Heading, Icon

### From components/ui (relative imports):

- Provider, Toaster, ColorModeProvider, Tooltip, PasswordInput

### Removed Packages

- ❌ Do NOT use `@emotion/styled` or `framer-motion`
- ❌ Icons: Use `lucide-react` or `react-icons` instead of `@chakra-ui/icons`
- ❌ Hooks: Use `react-use` or `usehooks-ts` instead of `@chakra-ui/hooks`

## Component Migration

### Toast System

```tsx
// ✅ New v3 way
import { toaster } from "./components/ui/toaster";

toaster.create({
  title: "Title",
  type: "error", // status → type
  meta: { closable: true }, // isClosable → meta.closable
  placement: "top-end", // top-right → top-end
});
```

### Dialog (formerly Modal)

```tsx
// ✅ New v3
<Dialog.Root open={isOpen} onOpenChange={onOpenChange} placement="center">
  <Dialog.Backdrop />
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Title</Dialog.Title>
    </Dialog.Header>
    <Dialog.Body>Content</Dialog.Body>
  </Dialog.Content>
</Dialog.Root>
```

### Button Icons

```tsx
// ✅ New v3 - Icons are children, not props
<Button>
  <Mail /> Email <ChevronRight />
</Button>
```

### Input with Validation

```tsx
// ✅ New v3
<Field.Root invalid>
  <Field.Label>Email</Field.Label>
  <Input />
  <Field.ErrorText>This field is required</Field.ErrorText>
</Field.Root>
```

### Table Structure

```tsx
// ✅ New v3 - Use compound components
<Table.Root variant="line">
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeader>Header</Table.ColumnHeader>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Cell</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>
```

### Tabs

```tsx
// ✅ New v3
<Tabs.Root defaultValue="one" colorPalette="orange">
  <Tabs.List>
    <Tabs.Trigger value="one">One</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="one">Content</Tabs.Content>
</Tabs.Root>
```

### Menu

```tsx
// ✅ New v3
<Menu.Root>
  <Menu.Trigger asChild>
    <Button>Actions</Button>
  </Menu.Trigger>
  <Menu.Content>
    <Menu.Item value="download">Download</Menu.Item>
  </Menu.Content>
</Menu.Root>
```

## Prop Name Changes

### Boolean Props

- `isOpen` → `open`
- `isDisabled` → `disabled`
- `isInvalid` → `invalid`
- `isRequired` → `required`
- `isActive` → `data-active`
- `isLoading` → `loading`
- `isChecked` → `checked`
- `isIndeterminate` → `indeterminate`

### Style Props

- `colorScheme` → `colorPalette`
- `spacing` → `gap`
- `noOfLines` → `lineClamp`
- `truncated` → `truncate`
- `thickness` → `borderWidth`
- `speed` → `animationDuration`

### Component Renames

- Divider → Separator
- Modal → Dialog
- Collapse → Collapsible
- Tags → Badge

## Style System

### Nested Styles

```tsx
// ✅ New v3 - the & is required
<Box css={{ "& svg": { color: "red.500" } }} />
```

### Gradients

```tsx
// ✅ New v3
<Box bgGradient="to-r" gradientFrom="red.200" gradientTo="pink.500" />
```

### Theme Access

```tsx
// ✅ New v3
const system = useChakra();
const gray400 = system.token("colors.gray.400");
```

## Best Practices

1. **Always use VStack/HStack**, not Stack (Stack is deprecated)
2. **Use compound components** for complex components (Dialog.Root, Table.Root, etc.)
3. **Import from correct sources** - check if component is in @chakra-ui/react or components/ui
4. **Boolean props** - remove `is` prefix (isOpen → open)
5. **Color props** - use `colorPalette` instead of `colorScheme`
6. **Icons as children** - don't use leftIcon/rightIcon props on Button

## Resources

- Full Migration Guide: https://chakra-ui.com/docs/get-started/migration
- Component Documentation: https://chakra-ui.com/docs/components
- Theming Guide: https://chakra-ui.com/docs/theming
