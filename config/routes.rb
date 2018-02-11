Rails.application.routes.draw do
  get 'welcome/index'

  resources :words

  root 'welcome#index'
end
