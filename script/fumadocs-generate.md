# fumadocs

https://fumadocs.dev/docs/ui

# Q&A

一共 3 个文件，其中 HTML 是 Cline 项目的文档侧边栏，分析这段 HTML 总结其文档路由结构然后:

1. 根据 fumadocs 的文档说明，生成 Cline 的 meta.json 配置

2. 根据 fumadocs 的文档说明，根据 meta.json 生成 Cline 的 .mdx 配置

html
script/fumadocs-markdown.mdx
script/fumadocs-page-conventions.mdx

注意：创建多个 meta.json 文件，分别放在不同的目录层级中。根目录有一个 meta.json，然后每个子文件夹中也有各自的 meta.json
