import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function start(): Promise<void> {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Project title')
    .setDescription('Some description')
    .setVersion('1.0.0.')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('/api/v1')
  app.enableCors()
  await app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))
}
start()
