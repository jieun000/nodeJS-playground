import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('weather')
export class WeatherController {
    constructor(private configService: ConfigService) {}

    @Get()
    public getWeather(): string {
        const apiUrl = this.configService.get('WEATHER_API_URL');
        const apiKey = this.configService.get('WEATHER_API_Key');

        return this.callWheatherApi(apiUrl, apiKey);
    }

    private callWheatherApi(apiUrl: string, apiKey: string): string {
        console.log('날씨 정보를 가져오는 중...');
        console.log(apiUrl);
        console.log(apiKey);
        return '오늘도 맑음';
    }
}
