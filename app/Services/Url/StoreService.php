<?php

namespace App\Services\Url;

use App\Models\Url;

class StoreService
{
    /**
     * @param  array  $data
     *
     * @return mixed
     */
    static public function run(array $data = [])
    {
        $data = array_merge($data, [
            'user_id' => auth()->user()->id
        ]);
        
        return Url::create($data);
    }
}
