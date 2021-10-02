<?php

namespace App\Console\Commands;

use App\Models\Url;
use Illuminate\Console\Command;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class TrackUrlCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'track:url';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Rastreamento de url's";

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $clientHttp = new Client();

        foreach (Url::untracked()->get() as $url) {
            try {
                $response = $clientHttp->request($url->method, $url->url);

                $url->status_code = $response->getStatusCode();
                $url->response_body = $response->getBody()->getContents();
            } catch (\Throwable $th) {
                $url->status_code = 401;
            }

            $url->date_acess = now();
            $url->save();
        }
    }
}
