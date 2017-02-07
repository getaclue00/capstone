class ApiConstraint
  # relevant links
  # 1) http://edgeguides.rubyonrails.org/action_controller_overview.html#the-request-object
  # 2) http://edgeguides.rubyonrails.org/routing.html#request-based-constraints (go to note #2)

  def matches?(request)
    request.format == :jsonapi
  end
end
