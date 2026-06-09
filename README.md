# PROYECTO PREDICA — Landing V3

> **Fusão:** Layout da `landing-v2` + Sistema visual do `brand-guideline`

## Sobre o Projeto

Plataforma de formação em **predicação bíblica** e **estudo do texto** da Sociedade Bíblica Argentina.

Missão: ensinar a *ver, expor e proclamar* a Escritura com fidelidade, clareza e convicção.

## Organização Visual (Design Tokens)

### Paleta de Cores

| Token          | Landing V2     | Brand Guideline        | V3 (fundido)       |
|----------------|----------------|------------------------|--------------------|
| `--c-flame`    | `#FF4D1F`      | `#FF4D1F`              | `#FF4D1F`          |
| `--c-forest`   | —              | `#0E5A3A`              | `#0E5A3A`          |
| `--c-deep`     | —              | `#0E2157`              | `#0E2157`          |
| `--c-blast`    | `#F5E03D`      | `#F5E03D`              | `#F5E03D`          |
| `--c-cream`    | —              | `#F4E0B0`              | `#F4E0B0`          |
| `--c-cyan`     | —              | `#5BB3D9`              | `#5BB3D9`          |
| `--c-ink`      | `#0A0A0A`      | `#0A0A0A`              | `#0A0A0A`          |
| `--c-paper`    | `#FFFFFF`      | `#FFFFFF`              | `#FFFFFF`          |
| `--c-paper-2`  | `#F7F5F0`      | `#F5EFE6`              | `#F5EFE6`          |

### Tipografia

| Família                | Uso                     | V2     | Guideline | V3     |
|------------------------|-------------------------|--------|-----------|--------|
| **Oliviar Sans**       | Display / titulares     | Sim    | Sim       | Sim    |
| **Chillends**          | Acento manuscrito       | Sim    | Sim       | Sim    |
| **Inter**              | Corpo / UI              | Sim    | Sim       | Sim    |
| **JetBrains Mono**     | Etiquetas / código      | —      | Sim       | Sim    |
| **GT Flexa Compressed**| Auxiliar / impacto      | —      | Sim       | Sim    |

### Grid e Layout

- Container: `1180px` (V2) → `1280px` (Guideline)
- Gutter: `clamp(20px, 4vw, 48px)` (V2) → `clamp(20px, 4vw, 64px)` (Guideline)
- Border radius: `14px` (V2) → `18px` (Guideline)

## Estrutura de Arquivos

```
landing-v3/
├── assets/
│   ├── fonts/          # Oliviar Sans, Chillends, Inter, GT Flexa, JetBrains Mono
│   ├── img/            # Logos, fotos, ícones
│   └── video/          # Vídeo do instrutor (Nico)
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Histórico de Commits

### v3.0 — Fusão brand-guideline + landing-v2

| Commit | Descrição |
|--------|-----------|
| `3.4` | **README.md** — organização visual, design tokens, histórico de commits |
| `3.5` | **Hero** — topo laranja do brand-guideline com grid overlay, tipografia `/PROYECTO PREDICA` (Oliviar Sans Light+Black), subtítulo Chillends, CTA branco, bottom bar com metadata. Sem rotor (X azul). Sem marquee (X azul). |
| `3.3` | **script.js** — nav burger, scroll reveal, smooth anchor, scrollspy |
| `3.2` | **styles.css** — paleta estendida (forest, deep, cream, cyan), Oliviar Sans full weights, GT Flexa Compressed/Mono, container 1280px, gutter 64px, radius 18px, grid overlay no manifesto, breakpoints mobile-first |
| `3.1` | **index.html** — seções: Nav (logo tipográfico /PROYECTO PREDICA), Manifiesto (dark + grid), Audience (3 cards), Featured (Ver y Proclamar), About (foto + quote), Sumate (CTA), Footer |
| `3.0` | **Estrutura** — criação da pasta `landing-v3/`, cópia de assets (17 fonts, 5 imgs, 1 video) de brand-guideline e landing-v2 |

### Decisões de design (V3)

- **Hero laranja** — topo do brand-guideline com grid overlay, tipografia gigante, sem rotor e sem marquee (marcados em azul no wireframe)
- **Logo tipográfico** — usa o lockup `/PROYECTO PREDICA` do brand-guideline em vez de imagem
- **Cores dos cards** — card B usa `--c-deep` (#0E2157) e card C usa `--c-forest` (#0E5A3A) em vez de blast/ink
- **Labels e meta** — usa `GT Flexa Mono` em vez de Inter para etiquetas monospace
- **Botões** — estilo pill com `GT Flexa Mono` uppercase + letter-spacing do brand-guideline

## Como Rodar

Abra o `index.html` no navegador (sem servidor necessário).

## Licença

© Proyecto Predica · Sociedad Bíblica Argentina · Todos os direitos reservados.
